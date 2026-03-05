import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/navbar/Navbar";
import Hotels from "./Components/Hotels";
import HotelDetails from "./Components/HotelDetails";
import Footer from "./Components/Footer";
import HotelList from "./Components/HotelsList";
import Signin from "./Components/Signin";
import BookingNow from "./Components/Payment";
import Profile from "./Components/Profile";
import About from "./Components/About";
import Careers from "./Components/Careers";
import Contact from "./Components/Contact";
import Cancellation from "./Components/Cancellation";
import Terms from "./Components/Terms";
import Privacy from "./Components/Privacy";

/* Layout */
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="contentWrapper">
        {children}
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Hotels />
            </MainLayout>
          }
        />

        {/* HOTEL LIST */}
        <Route
          path="/hotels"
          element={
            <MainLayout>
              <HotelList />
            </MainLayout>
          }
        />

        {/* HOTEL DETAILS */}
        <Route
          path="/hotels/:id"
          element={
            <MainLayout>
              <HotelDetails />
            </MainLayout>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        {/* PAYMENT */}
        <Route
          path="/payment"
          element={
            <MainLayout>
              <BookingNow />
            </MainLayout>
          }
        />

        {/* SIGNIN (NO NAVBAR) */}
        <Route path="/signin" element={<Signin />} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/careers" element={<MainLayout><Careers /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/cancellation" element={<MainLayout><Cancellation /></MainLayout>} />
      <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
      <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;