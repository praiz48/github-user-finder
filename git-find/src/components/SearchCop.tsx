import React from "react";
import { useRef } from "react";

interface SearchCopProps {
  handleinput: (input: string) => void;
}
const SearchCop = ({ handleinput }: SearchCopProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-gray-900 p-6">
      <form className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search GitHub username..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleinput(inputRef.current?.value ?? "");
              }
            }}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              handleinput(inputRef.current?.value ?? "");
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Try usernames like "torvalds" or "gaearon"
        </p>
      </form>
    </div>
  );
};

export default SearchCop;
