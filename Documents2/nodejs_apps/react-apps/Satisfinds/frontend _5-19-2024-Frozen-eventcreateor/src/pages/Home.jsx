import React from 'react';

import Hero from '../components/Hero';
import { Container} from '@chakra-ui/react'; // Import Chakra UI components
import '../styles/Home.css'
// Define custom styles (if needed)


function Home({ userProfileUrl }) {
  return (
    <Container>
      <Hero />
      
    </Container>
  );
}

export default Home;
