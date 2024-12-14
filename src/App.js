import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Helyezd a hookot ide
  const location = useLocation();

  useEffect(() => {
    // Ha a felhasználó nincs bejelentkezve, de nem a /sign-up oldalon van, irányítsd a /sign-in oldalra
    if (!isAuthenticated && location.pathname !== '/sign-up') {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate, location]);


  const HandleSignUpData = async ({ type, data }) => {
    console.log('Received data from SignUp:', { type, data });

    const endpoint =
      type === 'user'
        ? 'http://localhost:3001/api/users/sign-up'
        : 'http://localhost:3001/api/companies/sign-up';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/sign-in');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Failed to register. Please try again.');
    }
  };

  const HandleSignInData = async ({ type, data }) => {
    console.log('Received data from SignIn:', { type, data });

    const endpoint =
      type === 'user'
        ? 'http://localhost:3001/api/users/sign-in'
        : 'http://localhost:3001/api/companies/sign-in';
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      console.log('Response:', response);
      const result = await response.json();
      console.log('Result:', result);
  
      if (response.ok) {
        alert('Bejelentkezés sikeres!');
        setIsAuthenticated(true); // Frissítsd az autentikáció állapotát

        if (type === 'user') {
          navigate('/home', { state: { userName: result.name } }); // Felhasználói név
        } else if (type === 'company') {
          navigate('/home', { state: { companyName: result.companyName } }); // Céges név
        }

      } else {
        alert(`Hiba: ${result.error}`);
      }
    } catch (error) {
      console.error('Hiba a bejelentkezés során:', error);
      alert('A bejelentkezés nem sikerült. Kérlek, próbáld újra.');
    }
  };
  

  const HandleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/sign-in');
  };

  return (
      <Routes>
        <Route path="/" element={<SignIn  onSignIn={HandleSignInData}/>} />
        <Route path="/sign-in" element={<SignIn onSignIn={HandleSignInData} />} />
        <Route path="/sign-up" element={<SignUp onSignUp={HandleSignUpData} />} />
        <Route path="/home" element={isAuthenticated ? <Home onSignOut={HandleSignOut} /> : <SignIn />} />
      </Routes>
  );
}

export default App;
