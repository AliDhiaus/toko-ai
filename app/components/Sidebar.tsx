"use client";
import React from "react";
import Image from "next/image";
import Navlink from "./Navlink";
import Link from "next/link";
import { supabase } from "../lib/supabase";

const Sidebar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="w-56 bg-white shadow-md rounded-r-lg h-screen p-4">
      <div className="mb-4 p-2 border-b flex items-center gap-2">
        <Image src="/globe.svg" alt="Logo" width={36} height={36} />
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-wide">
          AI STORE
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <Navlink role="admin" />
        <Link
          href="/login"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md transition-all duration-200"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
