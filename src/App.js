
import Meals from "./components/Meals/Meals";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import React from 'react'
import { AuthContextProvider } from "./store/auth-context";




  function App() {
    return (
      <AuthContextProvider>
        <Router>
          <Layout>    
            <Routes>
              <Route path='/' element={<Meals/>}/>
              <Route exact path="/auth" element={<AuthPage/>}/>
              <Route path='/profile' element={<UserProfile/>} />
            </Routes>
          </Layout>
        </Router>      
      </AuthContextProvider>
    );
  }


export default App;

