const express = require('express');
const router = express.Router();
const db = require('../db'); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'GJ4#nF2$s8@W9z!qP^rT&vXyL1_8b@k0cZ%*A&f';


router.post('/home', async (req, res) => {
  const { vegzettseg, korcsoport, regio, nem, anyagi } = req.body;

  
  if (!vegzettseg || !korcsoport || !regio || !nem || !anyagi) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
  }

  
   if (!Date.parse(korcsoport)) {
    return res.status(400).json({ error: 'Érvénytelen dátum formátum!' });
  }

  try {

   
    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id; 

 
    await db.promise().query(
      'INSERT INTO users_responses (user_id, korcsoport, vegzettseg, regio, nem, anyagi_helyzet) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, new Date(korcsoport), vegzettseg, regio, nem, anyagi]
    );

    res.status(201).json({ message: 'Küldés sikeres!' });
  } catch (error) {
    console.error('Hiba történt a küldés közben:', error);
    res.status(500).json({ error: 'Hiba történt a küldés során.' });
  }
});



router.get('/check-form-filled', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;

  try {
    const [responses] = await db.promise().query(
      'SELECT * FROM users_responses WHERE user_id = ?',
      [userId]
    );

    if (responses.length > 0) {
      res.status(200).json({ isFormFilled: true });
    } else {
      res.status(200).json({ isFormFilled: false });
    }
  } catch (error) {
    console.error('Hiba történt a kérdőív kitöltésének ellenőrzése közben:', error);
    res.status(500).json({ error: 'Hiba történt a kérdőív kitöltésének ellenőrzése során.' });
  }
});


router.get('/available-surveys', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;

  try {
    const [userResponse] = await db.promise().query(
      `SELECT ur.* FROM users_responses ur
       JOIN user_connections uc ON ur.id = uc.connection_id
       WHERE uc.user_id = ? AND uc.connection_type = 'response'`,
      [userId]
    );

    if (userResponse.length === 0) {
      return res.status(200).json({ surveys: [] });
    }

    const userData = userResponse[0];

    const [surveys] = await db.promise().query(`
      SELECT s.id, s.title, s.credit_cost FROM survey_set s
      WHERE s.id NOT IN (SELECT survey_id FROM answers WHERE user_id = ?)
      AND (s.vegzettseg IS NULL OR s.vegzettseg = ?)
      AND (s.korcsoport IS NULL OR s.korcsoport = ?)
      AND (s.regio IS NULL OR s.regio = ?)
      AND (s.nem IS NULL OR s.nem = ?)
      AND (s.anyagi IS NULL OR s.anyagi = ?)`,
      [
        userId,
        userData.vegzettseg,
        userData.korcsoport,
        userData.regio,
        userData.nem,
        userData.anyagi_helyzet
      ]
    );

    res.status(200).json({ surveys });
  } catch (error) {
    console.error('Error fetching available surveys:', error);
    res.status(500).json({ error: 'Failed to fetch available surveys' });
  }
});



router.get('/survey/:id', async (req, res) => {
  try {
    const [survey] = await db.promise().query(
      `SELECT s.*, q.* 
       FROM survey_set s
       LEFT JOIN questions q ON s.id = q.survey_id
       WHERE s.id = ?`,
      [req.params.id]
    );
    res.json(survey);
  } catch (error) {
    console.error('Error fetching survey:', error);
    res.status(500).json({ error: 'Failed to fetch survey' });
  }
});



router.post('/submit-survey', async (req, res) => {
  const { surveyId, answers } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;

  try {
    const [survey] = await db.promise().query(
      'SELECT credit_cost FROM survey_set WHERE id = ?',
      [surveyId]
    );

    const userCreditReward = Math.floor(survey[0].credit_cost / 3);

    for (const answer of answers) {
      const [answerResult] = await db.promise().query(
        'INSERT INTO answers (user_id, survey_id, question_id, answer) VALUES (?, ?, ?, ?)',
        [userId, surveyId, answer.questionId, JSON.stringify(answer.value)]
      );

      // Add to user_connections table
      await db.promise().query(
        'INSERT INTO user_connections (user_id, connection_type, connection_id) VALUES (?, "answer", ?)',
        [userId, answerResult.insertId]
      );
    }

    await db.promise().query(
      'UPDATE users SET credits = credits + ? WHERE id = ?',
      [userCreditReward, userId]
    );

    res.status(200).json({ 
      message: 'Survey submitted successfully',
      creditsEarned: userCreditReward
    });
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ error: 'Failed to submit survey' });
  }
});


router.get('/survey-status/:surveyId', async (req, res) => {
  try {
    const [survey] = await db.promise().query(
      `SELECT s.title, s.mintavetel, COUNT(DISTINCT a.user_id) as completion_count 
       FROM survey_set s 
       LEFT JOIN answers a ON s.id = a.survey_id 
       WHERE s.id = ? 
       GROUP BY s.id`,
      [req.params.surveyId]
    );
    
    if (!survey || survey.length === 0) {
      return res.json({
        title: '',
        mintavetel: 0,
        completion_count: 0
      });
    }
    
    res.json(survey[0]);
  } catch (error) {
    console.error('Error fetching survey status:', error);
    res.status(500).json({ 
      error: 'Failed to fetch survey status',
      title: '',
      mintavetel: 0, 
      completion_count: 0
    });
  }
});


router.get('/company-surveys/:companyId', async (req, res) => {
  try {
    const [surveys] = await db.promise().query(
      `SELECT s.id, s.title, s.mintavetel, 
       DATE_FORMAT(s.date_created, '%Y-%m-%d') as created_date,
       COUNT(DISTINCT a.user_id) as completion_count,
       ROUND((COUNT(DISTINCT a.user_id) / s.mintavetel * 100)) as completion_percentage
       FROM survey_set s 
       LEFT JOIN answers a ON s.id = a.survey_id 
       WHERE s.ceg_id = ? 
       GROUP BY s.id`,
      [req.params.companyId]
    );
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch company surveys' });
  }
});



router.get('/survey-answers/:surveyId', async (req, res) => {
  try {
    const [questions] = await db.promise().query(
      `SELECT q.id, q.question, q.frm_option, q.type,
        COUNT(DISTINCT a.user_id) as total_responses
       FROM questions q
       LEFT JOIN answers a ON q.id = a.question_id
       WHERE q.survey_id = ?
       GROUP BY q.id`,
      [req.params.surveyId]
    );

    const surveyAnswers = await Promise.all(questions.map(async (question) => {
      if (question.type === 'text') {
        const [textAnswers] = await db.promise().query(
          `SELECT answer FROM answers WHERE question_id = ?`,
          [question.id]
        );
        return {
          questionText: question.question,
          type: question.type,
          answers: textAnswers.map(a => ({
            option: JSON.parse(a.answer)
          }))
        };
      }

      const options = JSON.parse(question.frm_option);
      const [answerCounts] = await db.promise().query(
        `SELECT answer, COUNT(*) as count
         FROM answers
         WHERE question_id = ?
         GROUP BY answer`,
        [question.id]
      );

      const answers = options.map(option => {
        const answerCount = answerCounts.reduce((count, a) => {
          const parsedAnswer = JSON.parse(a.answer);
          if (Array.isArray(parsedAnswer)) {
            return parsedAnswer.includes(option.label) ? count + a.count : count;
          } else {
            return parsedAnswer === option.label ? count + a.count : count;
          }
        }, 0);

        return {
          option: option.label,
          count: answerCount,
          percentage: Math.round((answerCount / question.total_responses) * 100) || 0
        };
      });

      return {
        questionText: question.question,
        type: question.type,
        answers: answers
      };
    }));

    res.json(surveyAnswers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch survey answers' });
  }
});


module.exports = router;