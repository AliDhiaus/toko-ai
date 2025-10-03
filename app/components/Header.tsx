"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { UserCircleIcon } from 'lucide-react';

const Header = () => { 
    const pathName = usePathname();
    const headName = pathName.split("/").pop()?.toUpperCase();
  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6 border-b">
      <div className="flex items-center space-x-4">
        <h1 className='text-2xl font-bold text-gray-800'>{headName}</h1>
      </div>

      <div className="flex items-center space-x-4">
        
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <UserCircleIcon className="h-6 w-6 text-indigo-500" />
          <span>Halo, Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;