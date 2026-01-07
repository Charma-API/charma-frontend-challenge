'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search for recipes...',
}: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-stone-500 group-focus-within:text-amber-500 
                                        transition-colors duration-300" />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3.5 
                   bg-stone-900/50 backdrop-blur-sm
                   border border-stone-800/50 rounded-xl
                   text-stone-100 placeholder-stone-500
                   focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20
                   transition-all duration-300
                   hover:border-stone-700"
      />
      
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center
                     text-stone-500 hover:text-stone-300 transition-colors"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

