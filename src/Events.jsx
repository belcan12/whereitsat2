import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { motion } from 'framer-motion';

export default function Events() {
  const [events, setEvents] = useState(null);
  const [error, setError]   = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('https://santosnr6.github.io/Data/events.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log('Events geladen:', data);
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        console.error('Kunde inte hämta events:', err);
        setError(err.message);
      }
    }
    fetchEvents();
  }, []);

  if (error) {
    return (
      <main style={{ padding: '1rem' }}>
        <h2>Kommande Event</h2>
        <p style={{ color: 'red' }}>Kunde inte ladda events: {error}</p>
      </main>
    );
  }

  if (events === null) {
    return (
      <main style={{ padding: '1rem' }}>
        <h2>Kommande Event</h2>
        <p>Laddar events…</p>
      </main>
    );
  }

  if (events.length === 0) {
    return (
      <main style={{ padding: '1rem' }}>
        <h2>Kommande Event</h2>
        <p>Inga events hittades.</p>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '1rem' }}
    >
      <h2>Kommande Event</h2>
      {events.map(ev => (
        <EventCard key={ev.id} event={ev} />
      ))}
    </motion.main>
  );
}
