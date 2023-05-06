import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./hardComponents/header";
import Footer from "./hardComponents/footer";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
const Home = lazy(() => import("./components/home"));
const Edit = lazy(() => import("./components/edit"));

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
        <Route path="/" element={<Hard />}>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<>
            <SignedIn><Home/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>} />
          <Route path="/edit" element={
           <>
            <SignedIn><Edit/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
           </>
          }/>
        </Route>

      </Routes>
    </ClerkProvider>
  );
}

export default App;
