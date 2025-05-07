import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { motion } from 'framer-motion';

export default function Events() {
  const [events, setEvents] = useState(null);
  const [error, setError]   = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('https://santosnr6.github.io/Data/events.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEvents();
  }, []);

  if (error) {
    return (
      <main style={{ padding: '1rem' }}>
        <h2 style={{ color: '#FFFFFF' }}>Kommande Event</h2>
        <p style={{ color: 'red' }}>Kunde inte ladda events: {error}</p>
      </main>
    );
  }

  if (events === null) {
    return (
      <main style={{ padding: '1rem' }}>
        <h2 style={{ color: '#FFFFFF' }}>Kommande Event</h2>
        <p>Laddar events…</p>
      </main>
    );
  }

  
  const filtered = events.filter(ev =>
    ev.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '1rem', paddingBottom: '4rem' }}
    >
      <h2 style={{ color: '#FFFFFF' }}>Kommande Event</h2>

      <input
        type="text"
        placeholder="Sök event..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          margin: '0.5rem 0 1rem 0',
          borderRadius: '4px',
          border: 'none'
        }}
      />

      {filtered.length > 0
        ? filtered.map(ev => <EventCard key={ev.id} event={ev} />)
        : <p>Inga event matchar din sökning.</p>
      }
    </motion.main>
  );
}
