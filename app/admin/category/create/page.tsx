"use client";
import React from "react";
import { categorySchema, FormCategory } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCategory } from "@/app/hooks/useCategory";
import FormCategoryPage from "@/app/components/form/FormCategory";

const CategoryCreatePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategory>({
    resolver: zodResolver(categorySchema),
  });

  const { createCategory } = useCategory();

  const { mutateAsync, isPending, isError, error } = createCategory;

  const onSubmit = async (data: FormCategory) => {
    try {
      await mutateAsync(data.name);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <FormCategoryPage
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default CategoryCreatePage;
