
import { Registrant } from './types';

const STORE_KEY = 'sewaconnect_registrants';

export const store = {
  getAll: (): Registrant[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORE_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  getById: (id: string): Registrant | undefined => {
    return store.getAll().find(r => r.id === id);
  },

  save: (registrant: Registrant) => {
    const all = store.getAll();
    const index = all.findIndex(r => r.id === registrant.id);
    if (index >= 0) {
      all[index] = registrant;
    } else {
      all.push(registrant);
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  },

  updateStatus: (id: string, status: Registrant['status']) => {
    const r = store.getById(id);
    if (r) {
      r.status = status;
      store.save(r);
    }
  },

  getStats: () => {
    const all = store.getAll();
    const paid = all.filter(r => r.status === 'Paid');
    return {
      totalRegistrants: all.length,
      paidRegistrants: paid.length,
      totalRevenue: paid.reduce((sum, r) => sum + r.amount, 0),
    };
  }
};
