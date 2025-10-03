"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { orderType } from "../types/data";

export const useOrder = () => {
  const queryClient = useQueryClient();

  const fetchOrders = async (): Promise<orderType[]> => {
    const { data, error } = await supabase.from("orders").select(`*, products(*)`);
    if (error) throw new Error(error.message);
    return data || [];
  };

  const ordersQuery = useQuery<orderType[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    placeholderData: (prev) => prev,
  });

  const createOrder = useMutation({
    mutationFn: async (payload: Partial<orderType> & { product_id: string[] }) => {
      const { error } = await supabase.from("orders").insert(payload);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<orderType> }) => {
      const { error } = await supabase.from("orders").update(payload).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const destroyOrder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  return {
    ordersQuery,
    createOrder,
    updateOrder,
    destroyOrder,
  };
};
