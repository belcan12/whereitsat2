import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from './useStore';
import generateTicketId from './generateTicketId';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent]       = useState(location.state?.event || null);
  const [loading, setLoading]   = useState(!event);
  const [error, setError]       = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addTickets = useStore(state => state.addTickets);

  useEffect(() => {
    if (event) return;
    fetch('https://santosnr6.github.io/Data/events.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const found = data.events.find(ev => ev.id === id);
        if (!found) throw new Error('Event ej hittat');
        setEvent(found);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, event]);

  if (loading) {
    return <main style={{ padding: '1rem' }}><p>Laddar…</p></main>;
  }
  if (error) {
    return (
      <main style={{ padding: '1rem', color: 'red' }}>
        <p>Fel: {error}</p>
      </main>
    );
  }

  // Beräkna totalpris
  const totalPrice = event.price * quantity;

  // Köp‐funktion
  const handleBuy = () => {
    const section = 'A';
    const start = Math.floor(Math.random() * 100);
    const newTickets = Array.from({ length: quantity }, (_, i) => ({
      id: uuidv4(),
      ticketId: generateTicketId(),
      eventTitle: event.name,
      section,
      seat: start + i,
    }));
    addTickets(newTickets);
    navigate('/orders');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '1rem' }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem' }}
      >
        ← Tillbaka
      </button>

      {/* Event‐information */}
      <article style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <h2>{event.name}</h2>
        <p>{event.when.date} • {event.when.from}–{event.when.to}</p>
        <p>{event.where} • {event.price > 0 ? event.price + ' kr' : 'Gratis'}</p>
      </article>

      {/* Kvantitetsväljare */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Minska antal">−</button>
        <span style={{ minWidth: '1.5rem', textAlign: 'center' }}>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)} aria-label="Öka antal">＋</button>
      </div>

      {/* Totalpris */}
      <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Total: {event.price > 0 ? `${totalPrice} kr` : 'Gratis'}
      </p>

      {/* Köp‐knapp */}
      <button onClick={handleBuy}>
        Köp {quantity} biljett{quantity > 1 ? 'er' : ''}
      </button>
    </motion.main>
  );
}
