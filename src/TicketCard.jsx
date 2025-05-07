import { motion } from 'framer-motion';

export default function TicketCard({ ticket }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '0.75rem',
        margin: '0.5rem 0'
      }}
    >
      <p><strong>Event:</strong> {ticket.eventTitle}</p>
      <p><strong>Biljett‑ID:</strong> {ticket.ticketId}</p>
      <p><strong>Sektion:</strong> {ticket.section}</p>
      <p><strong>Plats:</strong> {ticket.seat}</p>
    </motion.div>
  );
}
