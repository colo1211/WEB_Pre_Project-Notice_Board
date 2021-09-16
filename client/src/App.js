import React from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import NavBar from './components/views/NavBar/NavBar';
import SignIn from './components/views/SignIn/SignIn';
import SignUp from './components/views/SignUp/SignUp';

function App() {

  return (
    <div className="App">
        <Router>
          <NavBar/>
            <Switch>
              <Route exact path='/' component={ LandingPage }/>  
              <Route exact path='/signup' component={ SignUp }/>  
              <Route exact path='/signin' component={ SignIn }/>  
            </Switch>  
        </Router>      
    </div>
  );

}

export default App;
