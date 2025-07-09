import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/SignUp";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RefundPolicy from "./components/RefundPolicy";
import About from "./components/About";
import Home from "./components/Home";
import SplashScreen from "./components/SplashScreen";
import Contact from "./components/Contact";

function App() {
  const userData = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Screen should be outside Body */}
        <Route path="/" element={<SplashScreen />} />

        {/* Body wrapper with common layout like navbar/footer */}
        <Route path="/" element={<Body />}>
          {/* Home route after splash */}
          <Route path="/home" element={userData ? <Feed /> : <Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/refundPolicy" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
