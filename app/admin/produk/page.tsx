"use client";
import React, { useState } from "react";
import TableData from "@/app/components/TableData";
import { labelProduct } from "@/app/lib/dataTable";
import { useProduct } from "@/app/hooks/useProduct";
import { useRouter } from "next/navigation";
import FilterControl from "@/app/components/FilterControl";
import { useCategory } from "@/app/hooks/useCategory";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { FormProduct, productSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductPage = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>();
  const { categoriesQuery } = useCategory();
  const { productsQuery, destroyProduct, createProduct } = useProduct({
    search: searchValue,
    categoryFilter,
  });

  const {
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormProduct>({
    resolver: zodResolver(productSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = async (file: File, fieldOnChange: (file: File) => void) => {
    fieldOnChange(file);
    setPreview(URL.createObjectURL(file));
    const currentData = getValues();
    const dataToSubmit: FormProduct = {
      ...currentData,
      image: file,
    };
    try {
      await createProduct.mutateAsync(dataToSubmit);
      reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading, isError } = productsQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <form className="space-y-4">
        <Controller
          name="image"
          control={control}
          rules={{ required: "Foto produk wajib diunggah" }}
          render={({ field }) => (
            <div className="flex flex-col items-center gap-3">
              <label className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                Pilih Foto & Upload Otomatis
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file, field.onChange);
                  }}
                  className="hidden"
                />
              </label>
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              {preview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-cover rounded-md border shadow-sm"
                  />
                </div>
              )}
            </div>
          )}
        />
      </form>
        <FilterControl
          handleSearch={setSearchValue}
          handleFilter={(val: string) => setCategoryFilter(val)}
          dataList={categoriesQuery.data ?? []}
        />
      </div>
      <TableData
        columns={labelProduct}
        rows={data ?? []}
        handleEdit={(id: string | number) => router.push(`/admin/produk/${id}/edit`)}
        handleDelete={(id: string | number) => destroyProduct.mutate(String(id))}
      />
    </div>
  );
};

export default ProductPage;
