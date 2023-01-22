import React from "react";
import CustomHead from "./head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from "./body";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home = () => {
  return (
    <div>
      <CustomHead></CustomHead>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default Home;
