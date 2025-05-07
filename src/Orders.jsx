import { useStore } from './useStore';
import TicketCard from './TicketCard';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

export default function Orders() {
  const tickets = useStore(state => state.tickets);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (tickets.length) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(t);
    }
  }, [tickets]);

  return (
    <main style={{ padding: '1rem', paddingBottom: '4rem' }}>
      {showConfetti && <Confetti />}
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF' }}>
        Dina Biljetter
      </h2>
      {tickets.map(t => (
        <TicketCard key={t.id} ticket={t} />
      ))}
      {tickets.length === 0 && (
        <p style={{ textAlign: 'center', color: '#FFFFFF' }}>
          Du har inga biljettköp ännu.
        </p>
      )}
    </main>
  );
}
