"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, FormCategory } from "@/app/lib/schema";
import { useCategory } from "@/app/hooks/useCategory";
import FormCategoryPage from "@/app/components/form/FormCategory";
import { useParams, useRouter } from "next/navigation";

const CategoryEditPage = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const { updateCategory, categoriesQuery } = useCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategory>({
    resolver: zodResolver(categorySchema),
  });

  const category = categoriesQuery.data?.find(
    (c) => c.id === Number(id)
  );

  useEffect(() => {
    if (category) {
      reset({ name: category.name });
    }
  }, [category, reset]);

  const onSubmit = async (data: FormCategory) => {
    try {
      await updateCategory.mutateAsync({
        id: Number(id),
        name: data.name,
      });
      router.push("/admin/category");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormCategoryPage
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isPending={updateCategory.isPending}
      isError={updateCategory.isError}
      error={updateCategory.error}
    />
  );
};

export default CategoryEditPage;
