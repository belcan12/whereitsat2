import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <motion.article
      onClick={() => navigate(`/events/${event.id}`, { state: { event } })}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        margin: '0.5rem 0'
      }}
    >
      {/* Titel */}
      <h3>{event.name}</h3>

      {/* Datum och tid */}
      <p>
        {event.when.date} • {event.when.from}–{event.when.to}
      </p>

      {/* Plats och pris */}
      <p>
        {event.where} • {event.price > 0 ? event.price + ' kr' : 'Gratis'}
      </p>
    </motion.article>
  );
}
