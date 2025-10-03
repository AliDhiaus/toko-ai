"use client";
import React, { FC, useEffect, useState } from "react";
import ButtonSubmit from "../ButtonSubmit";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { FormTypeProps } from "@/app/types/props";
import { useCategory } from "@/app/hooks/useCategory";
import { FormProductEdit } from "@/app/lib/schema";

const FormProductPage: FC<FormTypeProps<FormProductEdit>> = ({
  handleSubmit,
  onSubmit,
  register,
  control,
  errors,
  isPending,
  thumbnail,
}) => {
  const [preview, setPreview] = useState<string | null>();

  useEffect(() => {
    if (thumbnail) {
      setPreview(thumbnail as string);
    }  
  }, [thumbnail]);

  const { categoriesQuery } = useCategory();
  const { data: categories } = categoriesQuery;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold">Form Produk</h2>

      <div>
        <label className="block mb-1">Nama Produk</label>
        <input
          type="text"
          {...register("name", { required: "Nama produk wajib diisi" })}
          className="w-full border p-2 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Deskripsi</label>
        <textarea
          {...register("description", { required: "Deskripsi wajib diisi" })}
          className="w-full border p-2 rounded-md"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Harga</label>
        <input
          type="number"
          {...register("price", {
            valueAsNumber: true,
            required: "Harga wajib diisi",
          })}
          className="w-full border p-2 rounded-md"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <Controller
        name="category_id"
        control={control}
        rules={{ required: "Kategori wajib dipilih" }}
        render={({ field }) => (
          <select
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-full border p-2 rounded-md"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      />

      <Controller
        name="image"
        control={control}
        rules={{ required: "Foto produk wajib diunggah" }}
        render={({ field }) => (
          <div>
            <label className="block mb-1">Foto Produk</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  field.onChange(file);
                }
              }}
              className="w-full border p-2 rounded-md"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
            {preview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Preview:</p>
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        )}
      />

      <ButtonSubmit isSubmitting={isPending}>Simpan</ButtonSubmit>
    </form>
  );
};

export default FormProductPage;
