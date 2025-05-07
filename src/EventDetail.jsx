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
    return <main style={{ padding: '1rem' }}><p style={{ color: '#FFFFFF' }}>Laddar…</p></main>;
  }
  if (error) {
    return (
      <main style={{ padding: '1rem' }}>
        <p style={{ color: 'red' }}>Fel: {error}</p>
      </main>
    );
  }

  const totalPrice = event.price * quantity;

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
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '4rem'  
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#FFFFFF' }}
      >
        ← Tillbaka
      </button>

      
      <p style={{
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '1rem'
      }}>
        You are about to score some tickets to…
      </p>

      <article style={{
        background: '#FFFFFF',
        color: '#000000',
        borderRadius: 8,
        padding: '1rem',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',   
        marginBottom: '1rem'
      }}>
        <h2 style={{ margin: 0, color: '#F56B9A' }}>{event.name}</h2>
        <p style={{ margin: '0.5rem 0' }}>
          {event.when.date} • {event.when.from}–{event.when.to}
        </p>
        <p style={{ margin: 0 }}>
          {event.where} • {event.price > 0 ? event.price + ' kr' : 'Gratis'}
        </p>
      </article>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
        <span style={{ minWidth: '1.5rem', textAlign: 'center', color: '#FFFFFF' }}>
          {quantity}
        </span>
        <button onClick={() => setQuantity(q => q + 1)}>＋</button>
      </div>

      <p style={{
        marginBottom: '1rem',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        Total: {event.price > 0 ? `${totalPrice} kr` : 'Gratis'}
      </p>

      <button
        onClick={handleBuy}
        style={{
          backgroundColor: '#37AEAB',
          color: '#FFFFFF',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Köp {quantity} biljett{quantity > 1 ? 'er' : ''}
      </button>
    </motion.main>
  );
}
