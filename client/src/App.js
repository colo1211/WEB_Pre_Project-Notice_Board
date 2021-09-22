import React from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DetailPage from './components/views/DetailPage/DetailPage';
import LandingPage from './components/views/LandingPage/LandingPage';
import NavBar from './components/views/NavBar/NavBar';
import SignIn from './components/views/SignIn/SignIn';
import SignUp from './components/views/SignUp/SignUp';
import Auth from './hoc/Auth'; 

function App() {

  return (
    <div className="App">
        <Router>
          <NavBar/>
            <Switch>
              <Route exact path='/' component={ Auth(LandingPage, true) }/>  
              <Route exact path='/signup' component={ Auth(SignUp, false) }/>  
              <Route exact path='/signin' component={ Auth(SignIn, false) }/>  
              <Route exact path='/detail/:id' component={ Auth(DetailPage, true) }/>  
            </Switch>  
        </Router>      
    </div>
  );

}

export default App;
