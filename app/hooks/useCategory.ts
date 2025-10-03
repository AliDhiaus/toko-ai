"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { categoryType } from "../types/data";
import { useRouter } from "next/navigation";

export const useCategory = (search?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const fetchCategories = async (): Promise<categoryType[]> => {
    let query = supabase.from("categories").select("*");

    if (search && search.trim() !== ""){
        query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data || [];
  };

  const categoriesQuery = useQuery<categoryType[], Error>({
    queryKey: ["categories", search],
    queryFn: fetchCategories,
    placeholderData: (prev) => prev,
  });

  const createCategory = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.from("categories").insert({ name });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        router.push("/admin/category");
    }
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const { error } = await supabase
        .from("categories")
        .update({ name })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        router.push("/admin/category");
    }
  });

  const destroyCategory = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return {
    categoriesQuery,
    createCategory,
    updateCategory,
    destroyCategory,
  };
};
