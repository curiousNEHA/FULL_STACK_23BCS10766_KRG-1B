import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Heroine from '../components/heroine';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useUser(); // Get logged-in user

 

  return (
    <div>
      <Navbar />
      <Heroine />
      <AppDownload />
      <Footer />
    </div>
  );
}

export default Home;
