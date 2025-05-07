import { motion } from 'framer-motion';

import logo from '/logo.png';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '1rem',
        display: 'flex',          
        flexDirection: 'column',  
        alignItems: 'center',     
        textAlign: 'center'       
      }}
    >
      {}
      <img
        src={logo}
        alt="Where it's @ logotyp"
        style={{ width: '150px', marginBottom: '1rem' }}
      />
      <h1>Välkommen till Where it’s @</h1>
      <p>Upptäck lokala musikevent och boka dina biljetter direkt!</p>
    </motion.main>
  );
}
