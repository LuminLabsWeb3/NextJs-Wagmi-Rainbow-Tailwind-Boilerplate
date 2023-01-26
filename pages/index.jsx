import React from 'react';
import CustomHead from './head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from './body';

const Home = () => {
  return (
    <>
      <CustomHead></CustomHead>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </>
  );
};

export default Home;
