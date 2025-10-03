import { useMutation } from '@tanstack/react-query';
import { PaymentPayload } from '../types/data';

export const usePayment = () => {
  const createPayment = useMutation<any, Error, PaymentPayload>({
    mutationFn: async (payload: PaymentPayload) => {      
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_CREATE_PAYMENT_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), 
      });
      const responseText = await response.text();
    
      if (!response.ok) {
        throw new Error(`Payment request failed with status ${response.status}: ${responseText}`); 
      }
      
      try {
        return JSON.parse(responseText);
      } catch (err) {
        console.error('Failed to parse payment response:', err);
      }
    },
  });

  return { createPayment };
};