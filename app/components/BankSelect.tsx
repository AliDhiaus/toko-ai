"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { labelBank } from "../lib/dataTable";
import { BankSelectProps } from "../types/props";

const BankSelect: React.FC<BankSelectProps> = ({ value, onChange }) => {
  const selectedBank = labelBank.find((b) => b.id === value);

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Pilih Bank
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="" disabled>
            -- Pilih Bank Transfer --
          </option>
          {labelBank.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
      </div>

      {selectedBank && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm">
          <div
            className={`h-10 w-10 flex items-center justify-center rounded-full text-white font-bold ${selectedBank.color}`}
          >
            {selectedBank.short}
          </div>
          <p className="text-gray-800 font-medium">{selectedBank.name}</p>
        </div>
      )}
    </div>
  );
};

export default BankSelect;
