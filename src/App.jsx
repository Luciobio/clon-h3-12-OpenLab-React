import { Route, Switch, Redirect } from 'wouter';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn } from './components/LogIn/LogIn';
import { Dashboard } from './components/Dasboard/Dashboard';
import { Home } from './components/sections/Home/Home';
import { CreateInitiative } from './components/sections/CreateInitiative/CreateInitiative';
import { NewInitiatives } from './components/sections/NewInitiatives/NewInitiatives';
import { Initiatives } from './components/sections/Initiatives/Initiatives';
import './App.css';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  // Show a loading state while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      {/* Login Route */}
      <Route path="/login">
        {!isAuthenticated ? <LogIn /> : <Redirect to="/dashboard/home" />}
      </Route>

      {/* Dashboard Route */}
      <Route path="/dashboard/:rest*">
        {isAuthenticated ? (
          <Dashboard>
            <Switch>
              {/* Sub-Routes for Dashboard */}
              <Route path="/dashboard/home" component={Home} />
              <Route path="/dashboard/create-new" component={CreateInitiative} />
              <Route path="/dashboard/new-initiatives" component={NewInitiatives} />
              <Route path="/dashboard/initiatives" component={Initiatives} />

              {/* Default route under /dashboard */}
              <Route>
                <Redirect to="/dashboard/home" />
              </Route>
            </Switch>
          </Dashboard>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      {/* Catch-All Redirect */}
      <Route>
        <Redirect to={isAuthenticated ? "/dashboard/home" : "/login"} />
      </Route>
    </Switch>
  );
}

export default App;
