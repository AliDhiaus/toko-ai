"use client";
import React, { useState } from "react";
import TableData from "../components/TableData";
import { useOrder } from "../hooks/useOrder";
import { labelOrder } from "../lib/dataTable";
import { ShoppingCart, DollarSign, Loader2 } from "lucide-react";
import { formatePrice } from "../utils";
import { usePayment } from "../hooks/usePayment";
import PaymentModal from "../components/ModalPayment";
import { MidtransResponse } from "../types/data";
import BankSelect from "../components/BankSelect";

const OrderPage = () => {
  const { ordersQuery } = useOrder();
  const { createPayment } = usePayment();
  const [paymentDetails, setPaymentDetails] = useState<MidtransResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const orders = ordersQuery.data || [];
  const totalHarga = orders.reduce((total, order) => total + order.total, 0);

  const handlePayment = async () => {
    try {
      const orderIds = orders.map(order => order.id);

      const responseData: MidtransResponse = await createPayment.mutateAsync({
        order_id: `order-${Date.now()}`,
        order_ids: orderIds,
        gross_amount: totalHarga,
        bank: selectedBank,
      });

      setPaymentDetails(responseData);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Gagal membuat transaksi pembayaran. Cek log konsol.");
    }
  };

  console.log(orders)
  return (
    <div className="min-h-screen bg-gray-50 p-10 space-y-10">
      <div className="bg-white shadow-sm rounded-2xl p-6 space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Track and manage customer orders efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="shadow-sm border rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {formatePrice(totalHarga)}
              </h2>
            </div>
          </div>
          <div className="shadow-sm border rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-green-100 text-green-600 p-3 rounded-xl">
              <ShoppingCart className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold text-gray-900">{orders.length}</h2>
            </div>
          </div>
        </div>

        <TableData columns={labelOrder} rows={orders} />

        {orders.length > 0 && (
          <div className="space-y-4">
            <BankSelect value={selectedBank} onChange={setSelectedBank} />
            <button
              onClick={handlePayment}
              disabled={
                orders.length === 0 || createPayment.isPending || !selectedBank
              }
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
            >
              {createPayment.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <DollarSign className="w-5 h-5" />
                  Bayar {orders.length} Order(s) - {formatePrice(totalHarga)}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {paymentDetails && isModalOpen && (
        <PaymentModal
          details={paymentDetails}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderPage;