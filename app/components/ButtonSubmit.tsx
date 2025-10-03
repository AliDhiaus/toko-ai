import { Loader2 } from "lucide-react";
import React, { FC, ReactNode } from "react";

interface ButtonSubmitProps {
  isSubmitting?: boolean;
  children: ReactNode;
}

const ButtonSubmit: FC<ButtonSubmitProps> = ({ isSubmitting = false, children }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="
        w-full flex justify-center items-center gap-2
        py-3 px-5
        bg-indigo-600 text-white font-semibold text-sm
        rounded-lg shadow-md
        transition-all duration-200 ease-in-out
        hover:bg-indigo-700 hover:shadow-lg
        active:bg-indigo-800 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-indigo-300
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin h-5 w-5" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonSubmit;
