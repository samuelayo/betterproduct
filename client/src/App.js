import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './Welcome'
import Notfound from './NotFound'
import Login from './Login'
import EditProfile from './EditProfile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/edit-profile" component={EditProfile} />
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>
    </div>
  );
}

export default App;
