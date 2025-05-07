import create from 'zustand';

export const useStore = create((set, get) => ({
  tickets: [],
  addTickets: (newTickets) => {
    set((state) => ({ tickets: [...state.tickets, ...newTickets] }));
  },
}));
