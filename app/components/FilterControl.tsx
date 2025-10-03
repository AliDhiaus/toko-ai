import { Search } from "lucide-react";
import React, { FC } from "react";
import { FilterControlProps } from "../types/props";

const FilterControl: FC<FilterControlProps> = ({ handleSearch, handleFilter, dataList }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            {handleSearch && (
                <div className="flex sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 px-3 py-1  rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition-colors duration-150">
                        <Search />
                    </button>
                </div>
            )}

            {handleFilter && (
                <select
                    className="pr-8 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                    defaultValue="" onChange={(e) => handleFilter(e.target.value)}
                >
                    <option value="" disabled>
                        Filter Category
                    </option>
                    <option value="all">All</option>
                    {dataList?.map((item, i) => (
                        <option key={i} value={item.id}>{item.name}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default FilterControl;
