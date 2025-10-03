import { Control, FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { DataListItem } from "./data";

interface Column {
  label: string;
  field: string;
}

export interface Variant {
  name: string;
  key: string;
}

export interface Row {
  id: string | number;
  [key: string]: any; 
}

export interface TableDataProps {
  columns: Column[];
  rows: Row[];
  handleView?: (id: string | number) => void;
  handleEdit?: (id: string | number) => void;
  handleDelete?: (id: string | number) => void;
}


export interface FormTypeProps<TFormValues extends FieldValues> {
  handleSubmit: UseFormHandleSubmit<TFormValues>;
  onSubmit: (data: TFormValues) => void;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  isPending: boolean;
  isError: boolean;
  error?: Error | null;
  control?: Control<TFormValues>;
  thumbnail?: string | File;
}

export interface BankSelectProps {
  value: string;
  onChange: (bank: string) => void;
}

export interface FilterControlProps {
    handleSearch?: (searchTerm: string) => void; 
    handleFilter?: (filterValue: string) => void;    
    dataList?: DataListItem[];
}