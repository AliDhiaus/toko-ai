import React, { FC } from "react";
import ButtonSubmit from "../ButtonSubmit";
import { FormTypeProps } from "@/app/types/props";
import { FormCategory } from "@/app/lib/schema";


const FormCategoryPage: FC<FormTypeProps<FormCategory>> = ({ handleSubmit, onSubmit, register, errors, isPending, isError, error }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Form Kategori
      </h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Kategori
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>
      <ButtonSubmit isSubmitting={isPending}>Simpan</ButtonSubmit>
      {isError && (
        <p className="text-red-500 text-sm italic mt-5 text-center bg-red-200 p-2 rounded-md">
          {error?.message}
        </p>
      )}
    </form>
  );
};

export default FormCategoryPage;
