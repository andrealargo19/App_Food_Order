
import { useContext } from 'react';
import Meals from "./components/Meals/Meals";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import React from 'react'
import AuthContext from "./store/auth-context";
import PrintPage from './pages/PrintPage';



function App() {
  const authCtx = useContext(AuthContext);
  
  return (
    <Router>
      <Layout>    
        <Routes>
          <Route
          path="/PrintPage"
          element={authCtx.isLoggedIn ? <PrintPage /> : <Navigate to="/auth" />}/>
          <Route
            path="/" 
            element={authCtx.isLoggedIn ? <Meals /> : <Navigate to="/auth" />}/>
          <Route
            path="/profile" 
            element={authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />}/>
          <Route
            path="/auth" 
            element={authCtx.isLoggedIn ? <Navigate to="/" /> :  <AuthPage />}/>
          <Route
            path="*" 
            element={<Navigate to="/auth" />}/>
        </Routes>
      </Layout>
    </Router>      
  );
}


export default App;

