import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Men } from "./Men";
import { Women } from "./Women";
import { Accessories } from "./Accessories";
import { Home } from "./Home";
import { About } from "./Footeritem/Cty/About";
import { Contact } from "./Footeritem/Cty/Contact";

import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Returnrefund } from "./Footeritem/Chinhsachkh/Returnrefund";
import Login from "./Login";
import Signup from "./Signup";

// import SideMenu from "../components/SideMenu";
// import CreateAccount from "../components/CreateAccount";
// import Login from "../components/Login";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return children;
};

export default function Pages(props) {
  return (
    <>
      <BrowserRouter>
        {/* <ScrollToTop>

        </ScrollToTop> */}
        <Wrapper>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="men" element={<Men />} />
              <Route path="women" element={<Women />} />
              <Route path="accessories" element={<Accessories />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="returnrefund" element={<Returnrefund />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
            <Footer />
          </Wrapper>
      </BrowserRouter>
    </>
  );
}
