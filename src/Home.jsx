import { motion } from 'framer-motion';
import logo from '/logo.png';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
        paddingBottom: '3rem' 
      }}
    >
      <img
        src={logo}
        alt="Where it's @ logotyp"
        style={{ width: '150px', marginBottom: '1rem' }}
      />
      <h1 style={{ color: '#F56B9A', margin: 0 }}>Where it’s @</h1>
      <p style={{ color: '#FFFFFF', marginTop: '0.5rem' }}>
        Ticketing made easy
      </p>
    </motion.main>
  );
}
