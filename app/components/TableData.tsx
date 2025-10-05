"use client";
import React, { FC } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { TableDataProps } from "../types/props";
import { formatePrice, getNestedValue } from "../utils";
import Image from "next/image";

const TableData: FC<TableDataProps> = ({
  columns,
  rows,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg border border-gray-200 mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              No
            </th>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
            {(handleEdit || handleDelete || handleView) && (
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((item, i) => (
            <tr key={i}>
              <td className="px-4 py-2 text-sm text-gray-700">{i + 1}</td>

              {columns.map((col, idx) => {
                const value =
                  col.field === "image"
                    ? item[col.field]
                    : getNestedValue(item, col.field);

                if (col.field === "image" || col.field === "products.image") {
                  return (
                    <td key={idx} className="px-4 py-2 text-sm text-gray-700">
                      <Image
                        src={value as string}
                        alt={"Product Image"}
                        width={100}
                        height={100}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                  );
                }

                if (col.field === "price" || col.field === "total") {
                  return (
                    <td key={idx} className="px-4 py-2 text-sm text-gray-700">
                      {formatePrice(value as number)}
                    </td>
                  );
                }

                return (
                  <td
                    key={idx}
                    className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                    title={
                      typeof value === "object" && value !== null
                        ? JSON.stringify(value)
                        : String(value ?? "-")
                    }
                  >
                    {(() => {
                      if (value == null) return "-";

                      if (typeof value === "object") {
                        return JSON.stringify(value);
                      }

                      return String(value);
                    })()}
                  </td>
                );
              })}

              {(handleEdit || handleDelete || handleView) && (
                <td className="px-4 py-2">
                  <div className="flex flex-col md:flex-row justify-center lg:gap-2">
                    {handleView && (
                      <button
                        onClick={() => handleView?.(item.id)}
                        className="p-1 hover:bg-blue-100 rounded-md"
                        title="View"
                      >
                        <Eye className="w-5 h-5 text-blue-500" />
                      </button>
                    )}
                    {handleEdit && (
                      <button
                        onClick={() => handleEdit?.(item.id)}
                        className="p-1 hover:bg-green-100 rounded-md"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-green-500" />
                      </button>
                    )}
                    {handleDelete && (
                      <button
                        onClick={() => handleDelete?.(item.id)}
                        className="p-1 hover:bg-red-100 rounded-md"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
