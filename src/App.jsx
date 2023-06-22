import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./hardComponents/header";
import Footer from "./hardComponents/footer";
import SignIn from "./hardComponents/signIn";
import SignInADMIN from "./admin/hardComponent/login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
const Home = lazy(() => import("./components/home"));
const Search = lazy(() => import("./components/showQRcode"));
const Edit = lazy(() => import("./components/edit"));

const Print = lazy(() => import("./components/print"));

import ResetPass from "./hardComponents/resetPass";
import ReactLoading from "react-loading";

// ADMIN IMPORT
import HeaderAdmin from "./admin/hardComponent/header";
import SideBar from "./admin/hardComponent/sideBar";

const Role = lazy(() => import("./admin/Component/role"));

const Test = lazy(() => import("./admin/Component/test"));


function HardAdmin() {
  return (
    // <>
    //   <HeaderAdmin />
    //   <SideBar/>
    //   <Suspense fallback={<p>Loading...</p>}>
    //     <Outlet />
    //   </Suspense>

    // </>
    <div className="flex flex-col">
      <HeaderAdmin />
      <div className="flex">
        <div className="mt-[80px] h-[300px] w-56 bg-gray-200">
          <SideBar />
        </div>
        <div className="flex-grow">
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}


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
    // <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLIC_KEY}>
    <ClerkProvider publishableKey='pk_test_ZnVsbC1nYXJmaXNoLTExLmNsZXJrLmFjY291bnRzLmRldiQ'>

      <Routes>
        <Route path="/signin" element={<>
          <SignedIn><Navigate to={'/home'} replace /></SignedIn>
          <SignedOut><SignIn /></SignedOut>
        </>} />
        <Route
            path="/reset-password"
            element={
              <>
                <SignedIn>
                  <Suspense
                    fallback={
                      <div className="loading">
                        <ReactLoading
                          type="spin"
                          color="#0083C2"
                          width={"50px"}
                          height={"50px"}
                        />
                      </div>
                    }
                  >
                    <ResetPass />
                  </Suspense>
                </SignedIn>
                <SignedOut>
                  <Navigate to="/signin" />
                </SignedOut>
              </>
            }
          />
        <Route path="/" element={<Hard />}>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search/:id" element={<Search />} />
          
          <Route path="/print" element={
            <>
              <Print />
            </>
          } />
          <Route path="/edit" element={<>
            <SignedIn><Edit /></SignedIn>
            <SignedOut><Navigate to={'/home'} replace /></SignedOut>
          </>} />
        

        </Route>
        <Route path="/signinadmin" element={<>
          <SignedIn><Navigate to={'/admin'} replace /></SignedIn>
          <SignedOut><SignInADMIN /></SignedOut>
        </>} />
        <Route path="/admin" element={<HardAdmin />}>
          <Route path="role" element={
            <>
              <SignedIn><Role /></SignedIn>
              <SignedOut><Navigate to={'/signinadmin'} replace /></SignedOut>
            </>} />
          <Route path="Test" element={<Test />} />

        </Route>

      </Routes>
    </ClerkProvider>
  );
}

export default App;
