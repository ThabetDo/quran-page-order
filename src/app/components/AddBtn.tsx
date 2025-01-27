import {ButtonHTMLAttributes} from "react";

export default function AddBtn(prop: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type='button'
            {...prop}
            className="flex items-center  text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-4"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
            &ensp;اضافة&ensp;
        </button>
    );
}
