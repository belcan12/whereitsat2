import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const nav = useNavigate();
  const loc = useLocation().pathname;

  const btnStyle = (path) => ({
    fontWeight: loc === path ? 'bold' : 'normal',
    color: '#FFFFFF',
  });

  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#F56B9A',
      padding: '0.5rem 0'
    }}>
      <button style={btnStyle('/')} onClick={() => nav('/')}>Home</button>
      <button style={btnStyle('/events')} onClick={() => nav('/events')}>Events</button>
      <button style={btnStyle('/orders')} onClick={() => nav('/orders')}>Orders</button>
    </footer>
  );
}
