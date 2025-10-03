"use client";
import React from "react";
import { formatePrice } from "../utils";
import { X } from "lucide-react";
import { PaymentModalProps } from "../types/data";

const PaymentModal: React.FC<PaymentModalProps> = ({ details, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-indigo-700">Detail Pembayaran VA</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-700">Transaksi Virtual Account berhasil dibuat. Harap selesaikan pembayaran:</p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 space-y-2">
          <p className="text-sm text-gray-600">Bank Tujuan:</p>
          <h3 className="text-xl font-extrabold text-gray-900">{details.bank}</h3>
          
          <p className="text-sm text-gray-600">Nomor Virtual Account:</p>
          <div className="flex justify-between items-center bg-white p-3 rounded-md border">
            <span className="text-2xl font-bold text-indigo-600">{details.va_number}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(details.va_number)} 
              className="text-indigo-500 text-sm hover:text-indigo-700 font-medium"
            >
              SALIN
            </button>
          </div>
          
          <p className="text-sm text-gray-600 pt-2">Total Pembayaran:</p>
          <h3 className="text-2xl font-extrabold text-red-600">{formatePrice(Number(details.gross_amount))}</h3>
        </div>
        
        <p className="text-xs text-gray-500 text-center">*Status pesanan akan diperbarui otomatis setelah Anda melakukan transfer.</p>
        <button 
          onClick={onClose} 
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Tutup & Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;