import { useState } from "react";
import { supabase } from "../lib/supabase";
import { FormRegister } from "../lib/schema";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (payload: FormRegister) => {
    setLoading(true);
    setError(null);
    const { email, password, name, image, role } = payload;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/login",
        },
      });

      if (error) setError(error.message);

      let imageUrl = "";
      if (image) {
        const fileName = `${Date.now()}_${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, image);

        if (uploadError) {
          console.log("Upload failed:", uploadError);
          setError(uploadError.message);
          return;
        }

        const url = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);
        imageUrl = url.data.publicUrl;
      }

      if (data) {
        const { error } = await supabase.from("users").insert({
          authid: data.user?.id,
          name,
          image: imageUrl,
          role,
        });

        if (error) setError(error.message);

        router.push("/login");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
    router.push("/admin/produk");
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { registerUser, login, logout, loading, error };
};
