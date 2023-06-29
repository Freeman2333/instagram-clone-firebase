import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
const SignUp = lazy(() => import("./pages/Signup"));
import './App.css'
import ReactLoader from "./components/loader";

const routes = [
  // <Route key="notFound" path="*" element={<NotFound />} />,
  <Route
    key={ROUTES.SIGN_UP}
    path={ROUTES.SIGN_UP}
    element={<SignUp/>}
  />
]

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<ReactLoader />}>
        <Routes>{routes}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
