import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import './App.css'
import ReactLoader from "./components/loader";
import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoute from "./helpers/protected-route";
import useUser from "./hooks/use-user";
import ExtendedUserContext from './context/extended-user'

const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));

const getRoutes = (user) => [
  // <Route key="notFound" path="*" element={<NotFound />} />,
  <Route key={ROUTES.SIGN_UP} path={ROUTES.SIGN_UP} element={<SignUp />} />,
  <Route key={ROUTES.LOGIN} path={ROUTES.LOGIN} element={<Login />} />,
  <Route
    path={ROUTES.DASHBOARD}
    key={ROUTES.DASHBOARD}
    exact
    element={
      <ProtectedRoute user={user}>
        <Dashboard />
      </ProtectedRoute>
    }
  />,
];

function App() {
  const { user } = useAuthListener();
  const { user: extendedUser, setActiveUser: setExtendedUser } = useUser(user?.uid);

  return (
    <BrowserRouter>
      <Suspense fallback={<ReactLoader />}>
        <ExtendedUserContext.Provider value={{ extendedUser, setExtendedUser }}>
          <Routes>{getRoutes(user)}</Routes>
        </ExtendedUserContext.Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
