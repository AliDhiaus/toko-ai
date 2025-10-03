import Link from "next/link";
import React from "react";
import { navlink } from "../lib/navlink";
import * as Icons from "lucide-react";
import { usePathname } from "next/navigation";

const Navlink = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const filteredLinks = navlink.filter((item) => item.role === role);
  return (
    <>
      {filteredLinks.map((item) => {
        const Icon = Icons[
          item.icon as keyof typeof Icons
        ] as unknown as Icons.LucideIcon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                    }
                  `}
          >
            {Icon && (
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </>
  );
};

export default Navlink;
