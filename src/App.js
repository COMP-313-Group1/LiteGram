import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

// for lazy loading
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));

export default function App() {
  const { user } = useAuthListener();

  const userProvider = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={userProvider}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} />
              }
            >
              <Route path={ROUTES.LOGIN} element={<Login />} />
            </Route>
            <Route
              path={ROUTES.SIGN_UP}
              element={
                <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} />
              }
            >
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            </Route>
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="/" element={<ProtectedRoute user={user} />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route component={NotFound} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
