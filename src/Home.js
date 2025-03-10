import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AppTheme from './AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ColorModeSelect from './ColorModeSelect';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import UserKredit from './userKredit';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(5),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '700px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const UserContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Home = ({ onSignOut, onSendData }) => {

  const location = useLocation();
  const userId = location.state?.userId;
  const [credits, setCredits] = useState(0);
  const [vegzettseg, setVegzettseg] = React.useState('');
  const [korcsoport, setKorcsoport] = React.useState(dayjs());
  const [regio, setRegio] = React.useState('');
  const [nem, setNem] = React.useState('');
  const [anyagi, setAnyagi] = React.useState('');
  const [isFormFilled, setIsFormFilled] = useState(false); 
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState('');
  const [showUserCreditPage, setShowUserCreditPage] = useState(false);
  
  const [answers, setAnswers] = useState({});

  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);






  const fetchCredits = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/credits/${userId}`);
      const data = await response.json();
      setCredits(data.credits);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  }, [userId]);
    

    useEffect(() => {
      fetchCredits();
    }, [userId, fetchCredits]);


  const handleCreditPurchase = (newCredits) => {
    setCredits(newCredits);
    fetchCredits()
  };


  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };


  const handleCloseSurvey = () => {
    setShowSurvey(false);
    setSelectedSurvey(null);
    fetchAvailableSurveys();
  };


  const handleVegzettseg = (event) => {
    setVegzettseg(event.target.value);
  };

  

  const handleKorcsoport = (newValue) => {
    setKorcsoport(newValue);
  };


  const handleRegio = (event) => {
    setRegio(event.target.value);
  };


  const handleNem = (event) => {
    setNem(event.target.value);
  };



  const handleAnyagi = (event) => {
    setAnyagi(event.target.value);
  };



  const sendData = async () => {
    const data = {
      vegzettseg,
      korcsoport,
      regio,
      nem,
      anyagi,
    };

    try {
      const response = await fetch('http://localhost:3001/api/main/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        setIsFormFilled(true);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };



const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const [anchorEl, setAnchorEl] = React.useState(null);
  const openprofile = Boolean(anchorEl);
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);



  
  console.log(location);
  


  const [availableSurveys, setAvailableSurveys] = useState([]);


  const handleSubmitSurvey = async () => {
    try {

      const surveyDetails = availableSurveys.find(s => s.id === selectedSurvey.question[0].survey_id);
    const creditAmount = Math.floor(surveyDetails.credit_cost / 3);
    
    console.log('Credit amount calculated:', creditAmount);

      const response = await fetch('http://localhost:3001/api/main/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          surveyId: selectedSurvey.question[0].survey_id,
          userId: userId,
          answers: Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value
          }))
        })
      });
  
      if (response.ok) {
        
        const transactionResponse = await fetch('http://localhost:3001/api/users/add-survey-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            userId: userId,
            amount: creditAmount,
            title: surveyDetails.title
          })
        });
  
        if (!transactionResponse.ok) {
          throw new Error('Transaction failed');
        }
  
        await fetchCredits();
        handleCloseSurvey();
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };


  useEffect(() => {
    const checkIfSignedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsSignedIn(true);
        const response = await fetch('http://localhost:3001/api/main/check-form-filled', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.isFormFilled) {
          setIsFormFilled(true);
        }
      }
    };
    checkIfSignedIn();
  }, []);




  const fetchAvailableSurveys = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/main/available-surveys', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      console.log('Fetched surveys:', data);
      setAvailableSurveys(data.surveys || []);
    } catch (error) {
      console.error('Error fetching available surveys:', error);
      setAvailableSurveys([]);
    }
  };
  
  useEffect(() => {
    fetchAvailableSurveys();
  }, []);




  const handleSurveyClick = async (surveyId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/main/survey/${surveyId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const surveyData = await response.json();

      const questions = Array.isArray(surveyData) ? surveyData : [];

      const surveyTitle = availableSurveys.find(survey => survey.id === surveyId)?.title;

      setSelectedSurvey({
        title: surveyTitle,
        question: questions 
      });

      setShowSurvey(true);
    } catch (error) {
      console.error('Error opening survey:', error);
    }
  };


  




  useEffect(() => {
    if (location.state) {
      setName(location.state.userName);
    }
  }, [location]);

  if (isSignedIn) {
    if (isFormFilled) {
  return (

    <AppTheme {...onSendData}>
      <UserContainer direction="column" justifyContent="space-between">
      <React.Fragment>

      <Typography
        component="h1"
        variant="h3"
        sx={{
          position: 'absolute',
          top: 26,
          left: 26,
          cursor: 'pointer'
        }}
        onClick={() => {
          setShowUserCreditPage(true);
          setShowSurvey(false);
        }}
      >
        {credits} Kredit
      </Typography>


      <Typography
        component="h1"
        variant="h6"
        sx={{
          textAlign: 'center',
          mb: 2,
        }}
      >
        Köszöntjük az oldalon, {name}!
      </Typography>
      {!showUserCreditPage && !showSurvey && (
          <Card
            variant="outlined"
            sx={{
              mt: 10, 
              width: "95% !important",
              height: "70vh",
              maxWidth: "700px !important",
              position: "relative",
              padding: "20px",
              overflow: "auto",
              '& .MuiButton-root': {
              minHeight: '80px',
              height: '80px !important',
              flexShrink: 0
              }
            }}
          >
            <Typography variant="h4" sx={{ mt: 1, ml: 2, mb: 3 }}>
              Elérhető kérdőívek ({availableSurveys.length})
            </Typography>
            
            {availableSurveys.map((survey) => (
              <Button
                key={survey.id}
                onClick={() => handleSurveyClick(survey.id)}
                sx={{
                  height: "80px !important",
                  textAlign: "left",
                  pl: 4,
                  fontSize: "1.2rem",
                  mb: 2,
                  width: "100%",
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                variant="outlined"
              >
                <span>{survey.title}</span>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '1rem' }}>+</Typography>
                  <span style={{ fontSize: '1rem' }}>{Math.floor(survey.credit_cost / 3)}</span>
                </Box>
                <Typography variant="caption" sx={{ mt: -0.5 }}>
                  Kredit
                </Typography>
              </Box>
              </Button>
            ))}
          </Card>
        )}


        {showSurvey && selectedSurvey && (
          <Card
            variant="outlined"
            sx={{
              mt: 3, 
              width: "95% !important",
              height: "70vh",
              maxWidth: "700px !important",
              position: "relative",
              padding: "20px",
              overflow: "auto"
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                mt: 1, 
                ml: 2,
                fontWeight: 'bold',
                borderBottom: '2px solid',
                pb: 2,
                mb: 3
              }}
            >
              {selectedSurvey.title}
            </Typography>


            {selectedSurvey.question.map((question, index) => (
              <Container
                key={index}
                sx={{
                  padding: "16px",
                  borderRadius: "16px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.background.paper
                      : "#1B2430",
                  height: "auto",
                  width: "98%",
                  position: "relative",
                  mt: 2
                }}
              >
                <Box sx={{ mb: 4, ml: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {question.question}
                  </Typography>

                  {question.type === "radio" && (
                    <RadioGroup
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    >
                      {JSON.parse(question.frm_option).map((option, optIndex) => (
                        <FormControlLabel
                          key={optIndex}
                          value={option.label}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === "checkbox" && (
                    <FormGroup>
                      {JSON.parse(question.frm_option).map((option, optIndex) => (
                        <FormControlLabel
                          key={optIndex}
                          control={
                            <Checkbox 
                              checked={answers[question.id]?.includes(option.label) || false}
                              onChange={(e) => {
                                const currentAnswers = answers[question.id] || [];
                                const newAnswers = e.target.checked 
                                  ? [...currentAnswers, option.label]
                                  : currentAnswers.filter(value => value !== option.label);
                                handleAnswerChange(question.id, newAnswers);
                              }}
                            />
                          }
                          label={option.label}
                        />
                      ))}
                    </FormGroup>
                  )}

                  {question.type === "text" && (
                    <TextField
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      fullWidth
                      placeholder="Írja ide válaszát..."
                      multiline
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              </Container>
            ))}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2, mb: 2 }}>
              <Button
                onClick={handleCloseSurvey}
                variant="outlined"
              >
                Vissza a kérdőívekhez
              </Button>
              <Button
                onClick={handleSubmitSurvey}
                variant="contained"
                color="primary"
              >
                Küldés
              </Button>
            </Box>
          </Card>
        )}
        



        {/* user Kredit oldal */}
        {!showSurvey && showUserCreditPage && (
          <UserKredit 
            onClose={() => setShowUserCreditPage(false)}
            currentCredits={credits}
            onPurchase={handleCreditPurchase}
            userId={userId}
          />
        )}

        <CssBaseline enableColorScheme />


      
      <ColorModeSelect sx={{ position: 'absolute', top: '1rem', right: '5rem' }} />
      <Tooltip title="Account settings">
    <IconButton
      onClick={handleClickProfile}
      size="small"
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 0, 
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        overflow: 'hidden', 
      }}
      aria-controls={openprofile ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={openprofile ? 'true' : undefined}
    >
      <Avatar sx={{ width: 40, height: 40 }} src="/static/images/avatar/2.jpg" />
    </IconButton>
  </Tooltip>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openprofile}
        onClose={handleCloseProfile}
        onClick={handleCloseProfile}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseProfile}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>


      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Kijelentkezés"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Biztosan ki szeretne jelentkezni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nem</Button>
          <Button onClick={onSignOut}>Igen</Button>
        </DialogActions>
      </Dialog>

      </React.Fragment>
    </UserContainer>
    </AppTheme>
    )} else{ 
      return(
        <AppTheme {...onSendData}>
          <UserContainer direction="column" justifyContent="space-between">
            <React.Fragment>


            <CssBaseline enableColorScheme />


                <Typography
              component="h1"
              variant="h6"
              sx={{
                textAlign: 'center',
                mb: 2,
              }}
            >
              Köszöntjük az oldalon, {name}!
            </Typography>
            
            <ColorModeSelect sx={{ position: 'absolute', top: '1rem', right: '5rem' }} />
            

            <Card variant="outlined">
    

      
            <FormControl sx={{ m: 1, minWidth: 240 }}>
  <InputLabel
    id="demo-simple-select-autowidth-label"
    sx={{
      fontSize: '1.2rem', 
      fontWeight: 'bold', 
      lineHeight: '1.5',  
      
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0, -1.8rem)', 
      },
    }}
  >
    Legmagasabb végzettség
  </InputLabel>
  <Select
  labelId="demo-simple-select-autowidth-label"
  id="demo-simple-select-autowidth"
  value={vegzettseg}
  onChange={handleVegzettseg}
  autoWidth
  label="Legmagasabb végzettség"
  sx={{
    fontSize: '1.2rem', 
    padding: '10px',    
    height: '60px',     
  }}
>
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={1}>Egyetem, főiskola stb. oklevéllel</MenuItem>
    <MenuItem value={2}>Középfokú végzettség érettségi nélkül, szakmai végzettséggel</MenuItem>
    <MenuItem value={3}>Középfokú végzettség érettségivel (szakmai végzettség nélkül)</MenuItem>
    <MenuItem value={4}>Középfokú végzettség érettségivel (szakmai végzettségel)</MenuItem>
    <MenuItem value={5}>Általános iskola 8. osztálya</MenuItem>
    <MenuItem value={6}>8 általános iskolánál kevesebb</MenuItem>
  </Select>
</FormControl>





<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker 
    label="Születési dátum"
    value={korcsoport}
    onChange={handleKorcsoport}
    open={isCalendarOpen}
    onOpen={() => setIsCalendarOpen(true)}
    onClose={() => setIsCalendarOpen(false)}
    slotProps={{
      textField: {
        onClick: () => setIsCalendarOpen(true),
        sx: {
          width: '100%',
          '& .MuiInputBase-root': {
            fontSize: '1.2rem',
            padding: '10px',
            height: '60px',
            cursor: 'pointer'
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            lineHeight: '1.5'
          },
          '& .MuiInputAdornment-root': {
            marginRight: '8px'
          }
        }
      },
      popper: {
        sx: { zIndex: 1300 }
      }
    }}
  />
</LocalizationProvider>


      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label"
        sx={{
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          lineHeight: '1.5',  
          
          '&.MuiInputLabel-shrink': {
            transform: 'translate(0, -1.8rem)', 
          },
        }}
        >
          Régió</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={regio}
          onChange={handleRegio}
          autoWidth
          label="Régió"
          sx={{
            fontSize: '1.2rem', 
            padding: '10px',    
            height: '60px',     
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={14}>Nyugat-Dunántúl</MenuItem>
          <MenuItem value={15}>Közép-Dunántúl</MenuItem>
          <MenuItem value={16}>Közép-Magyarország</MenuItem>
          <MenuItem value={17}>Észak-Magyarország</MenuItem>
          <MenuItem value={18}>Észak-Alföldv</MenuItem>
          <MenuItem value={19}>Dél-Alföld</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label"
        sx={{
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          lineHeight: '1.5',  
          
          '&.MuiInputLabel-shrink': {
            transform: 'translate(0, -1.8rem)', 
          },
        }}
        >
          Neme</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={nem}
          onChange={handleNem}
          autoWidth
          label="Neme"
          sx={{
            fontSize: '1.2rem', 
            padding: '10px',    
            height: '60px',     
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={20}>Férfi</MenuItem>
          <MenuItem value={21}>Nő</MenuItem>
          <MenuItem value={22}>Egyéb</MenuItem>
        </Select>
      </FormControl>



      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-autowidth-label"
        sx={{
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          lineHeight: '1.5',  
          
          '&.MuiInputLabel-shrink': {
            transform: 'translate(0, -1.8rem)', 
          },
        }}
        >
          Havi nettó átlagkereset</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={anyagi}
          onChange={handleAnyagi}
          autoWidth
          label="Havi nettó átlagkereset"
          sx={{
            fontSize: '1.2rem', 
            padding: '10px',    
            height: '60px',     
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={23}>{'<'} 100 000 Ft</MenuItem>
          <MenuItem value={24}>100 000 Ft - 250 000 Ft</MenuItem>
          <MenuItem value={25}>250 000 Ft - 500 000 Ft</MenuItem>
          <MenuItem value={26}>500 000 Ft - 1 000 000 Ft</MenuItem>
          <MenuItem value={27}>1 000 000 Ft - 1 500 000 Ft</MenuItem>
          <MenuItem value={28}>1 500 000 Ft {'<'}</MenuItem>
        </Select>
      </FormControl>

      <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={sendData}
            >
              Küldés
      </Button>
    </Card>
  


  <Tooltip title="Account settings">
    <IconButton
      onClick={handleClickProfile}
      size="small"
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 0, 
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        overflow: 'hidden', 
      }}
      aria-controls={openprofile ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={openprofile ? 'true' : undefined}
    >
      <Avatar sx={{ width: 40, height: 40 }} src="/static/images/avatar/2.jpg" />
    </IconButton>
  </Tooltip>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openprofile}
        onClose={handleCloseProfile}
        onClick={handleCloseProfile}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseProfile}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>


      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Kijelentkezés"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Biztosan ki szeretne jelentkezni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nem</Button>
          <Button onClick={onSignOut}>Igen</Button>
        </DialogActions>
      </Dialog>
  </React.Fragment>
  </UserContainer>
</AppTheme>
  );
  }
}
};

export default Home;