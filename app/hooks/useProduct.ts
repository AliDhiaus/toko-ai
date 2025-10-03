import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";
import { FormProduct, FormProductEdit } from "@/app/lib/schema";
import { productType } from "../types/data";
import { useRouter } from "next/navigation";

export const useProduct = ({
  search = "",
  categoryFilter,
}: { search?: string; categoryFilter?: string } = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const productsQuery = useQuery<productType[], Error>({
    queryKey: ["products", search, categoryFilter],
    queryFn: async () => {
      let query = supabase.from("products").select(`
        id,
        name,
        description,
        price,
        image,
        category_id,
        categories(name)
      `);

      if (categoryFilter) {
        if (categoryFilter !== "all") {
          query = query.eq("category_id", categoryFilter);
        }
      }

      if (search.trim() !== "") {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const createProduct = useMutation({
    mutationFn: async (data: FormProduct) => {
      const file = data.image;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("products")
        .upload(`images/${file.name}-${Date.now()}`, file);
      if (uploadError) throw uploadError;

      const imageUrl = supabase.storage
        .from("products")
        .getPublicUrl(uploadData.path).data.publicUrl;

      if (!imageUrl || !imageUrl.startsWith("http")) {
        console.error(
          "Critical Error: imageUrl is invalid or empty:",
          imageUrl
        );
        throw new Error(
          "URL gambar kosong setelah upload. Cek Policy RLS Supabase."
        );
      }

      const payload = {
        image: imageUrl,
      }
  
      const res = await fetch(process.env.NEXT_PUBLIC_N8N_PRODUCT_CREATE_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error from n8n Webhook:", errorText);
        throw new Error(
          "Failed to create product via AI extraction. Check n8n executions for details."
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormProductEdit }) => {
      let imageUrl = "";
      if (data.image) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("products")
          .upload(`images/${data.image.name}-${Date.now()}`, data.image);
        if (uploadError) throw uploadError;

        imageUrl = supabase.storage
          .from("products")
          .getPublicUrl(uploadData.path).data.publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: data.name,
          description: data.description,
          price: data.price,
          category_id: Number(data.category_id),
          image: imageUrl,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/admin/produk");
    },
  });

  const destroyProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return { productsQuery, createProduct, updateProduct, destroyProduct };
};
