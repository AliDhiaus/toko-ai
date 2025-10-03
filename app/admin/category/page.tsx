"use client";
import FilterControl from "@/app/components/FilterControl";
import TableData from "@/app/components/TableData";
import { useCategory } from "@/app/hooks/useCategory";
import { labelCategory } from "@/app/lib/dataTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CategoryPage = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const { categoriesQuery, destroyCategory } = useCategory(searchValue);
  const { data: categories, isLoading, isError, error } = categoriesQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <Link href="/admin/category/create">Tambah Kategori</Link>
      <FilterControl handleSearch={setSearchValue} />
      <TableData
        columns={labelCategory}
        rows={categories ?? []}
        handleDelete={(id: string | number) =>
          destroyCategory.mutate(Number(id))
        }
        handleEdit={(id: string | number) =>
          router.push(`/admin/category/${id}/edit`)
        }
      />
    </div>
  );
};

export default CategoryPage;
