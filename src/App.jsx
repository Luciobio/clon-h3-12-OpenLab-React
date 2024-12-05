import { Route, Switch, useLocation, Redirect } from 'wouter';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn } from './components/LogIn/LogIn';
import { Dashboard } from './components/Dasboard/Dashboard';
import './App.css';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [, setLocation] = useLocation();

  // Show a loading state while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/login">
        {!isAuthenticated ? <LogIn /> : <Redirect to="/dashboard" />}
      </Route>
      <Route path="/dashboard">
        {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route>
        {/* Redirect to login by default if no other route matches */}
        <Redirect to={isAuthenticated ? "/dashboard" : "/login"} />
      </Route>
    </Switch>
  );
}

export default App;

