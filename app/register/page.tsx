"use client";
import React, { useState, useEffect } from "react";
import { FormRegister, registerSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import ButtonSubmit from "../components/ButtonSubmit";

const RegisterPage = () => {
  const { registerUser, loading, error } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormRegister) => {
    await registerUser(data);
    reset();
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Buat Akun Baru
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Masuk di sini
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-gray-700 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-gray-700 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Kata Sandi"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-gray-700 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Konfirmasi Kata Sandi"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-gray-700 focus:ring-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <select
                {...field}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-gray-700 focus:ring-indigo-500 ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}

          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      const url = URL.createObjectURL(file);
                      setPreview(url);
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-gray-700 focus:ring-indigo-500 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {preview && (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="mt-2 w-32 h-32 object-cover rounded-md border"
                  />
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            )}
          />

          <ButtonSubmit isSubmitting={loading}>Daftar</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
