import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Events from './Events';
import EventDetail from './EventDetail';
import Orders from './Orders';
import Footer from './Footer';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        {}
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </>
  );
}
