import {InputHTMLAttributes} from "react";

type IProps = {
    name: string,
    defaultValue?: string,
    title: string,
} & InputHTMLAttributes<HTMLInputElement>
export default function Input(prop: IProps) {
    const {title, defaultValue, name, ...inputProps } = prop
    return (
        <label
            htmlFor={`id${name}`}
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
            <input
                {...inputProps}
                defaultValue={defaultValue}
                id={`id${name}`}
                name={name}
                placeholder={title}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span
                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
            >
                {title}
            </span>
        </label>
    )
}
