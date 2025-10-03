"use client";
import FormProductPage from "@/app/components/form/FormProduct";
import { useProduct } from "@/app/hooks/useProduct";
import { FormProductEdit, productEditSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditProductPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<FormProductEdit>({
    resolver: zodResolver(productEditSchema),
  });

  const { id } = useParams();
  const productId = String(id);
  const { productsQuery, updateProduct } = useProduct();
  const product = productsQuery.data?.find((p) => p.id === productId);

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        image: undefined, 
      });
    }
  }, [product, reset]);

  const { mutateAsync, isPending, isError } = updateProduct;

  const onSubmit = async (data: FormProductEdit) => {
    try {
      await mutateAsync({ id: productId, data });
      reset();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <FormProductPage
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        control={control}
        isError={isError}
        errors={errors}
        isPending={isPending}
        thumbnail={product?.image}
      />
    </>
  );
};

export default EditProductPage;
