import { motion } from 'framer-motion';

export default function TicketCard({ ticket }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: '#FFFFFF',
        color: '#000000',
        borderRadius: '6px',
        padding: '0.75rem',
        margin: '0.5rem 0',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',      
      }}
    >
      {/* Eventnamn */}
      <p style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1.1rem',
        color: '#F56B9A'
      }}>
        <strong>{ticket.eventTitle}</strong>
      </p>

      {/* Sektion och Plats på samma rad */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',          
        marginBottom: '0.5rem'
      }}>
        <p style={{ margin: 0 }}><strong>Sektion:</strong> {ticket.section}</p>
        <p style={{ margin: 0 }}><strong>Plats:</strong> {ticket.seat}</p>
      </div>

      {/* Biljett-ID */}
      <p style={{ margin: 0 }}>
        <strong>Biljett-ID:</strong> {ticket.ticketId}
      </p>
    </motion.div>
  );
}
