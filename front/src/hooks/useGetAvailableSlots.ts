import { useState } from 'react';
import type { Slot } from '../types/Slot';

const useGetAvailableSlots = () => {
  const [error, setError] = useState<Error | null>(null);
  const getAvailableSlots = async (date: Date, duration: number): Promise<Slot[]> => {
    setError(null);
      try {   
      
      const response = await fetch('/api/slots/available', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          duration
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error fetching available slots:', error);
      return [];
    }
  };
  
  return getAvailableSlots;
};  
export default useGetAvailableSlots;