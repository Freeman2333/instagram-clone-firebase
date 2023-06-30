import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import './App.css'
import ReactLoader from "./components/loader";
import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoute from "./helpers/protected-route";

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

  return (
    <BrowserRouter>
      <Suspense fallback={<ReactLoader />}>
        <Routes>{getRoutes(user)}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
