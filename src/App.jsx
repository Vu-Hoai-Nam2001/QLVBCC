import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./hardComponents/header";
import Footer from "./hardComponents/footer";
import SignIn from "./hardComponents/signIn";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
const Home = lazy(() => import("./components/home"));
const Teacher = lazy(() => import("./components/teacher"));
const Student = lazy(() => import("./components/student"));

function Hard() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLIC_KEY}>

      <Routes>
        <Route path="/signin" element={<>
          <SignedIn><Navigate to={'/teacher'} replace/></SignedIn>
          <SignedOut><SignIn /></SignedOut>
        </>} />
        <Route path="/" element={<Hard />}>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />



          <Route path="/teacher" element={
            <>
              <SignedIn><Teacher /></SignedIn>
              <SignedOut><Navigate to={'/home'} replace/></SignedOut>
            </>
          } />
          <Route path="/student" element={
            <>
              <SignedIn><Student /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
        </Route>

      </Routes>
    </ClerkProvider>
  );
}

export default App;
