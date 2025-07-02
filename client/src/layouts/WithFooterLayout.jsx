import React from "react";
import Footer from "../components/Footer";

const WithFooterLayout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default WithFooterLayout;
