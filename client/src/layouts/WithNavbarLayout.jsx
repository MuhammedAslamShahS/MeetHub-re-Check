import React from "react";
import Navbar from "../components/Navbar";

const WithNavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default WithNavbarLayout;
