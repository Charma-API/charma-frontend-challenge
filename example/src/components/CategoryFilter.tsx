'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Category } from '@/types/recipe';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
  isLoading?: boolean;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
  isLoading = false,
}: CategoryFilterProps) {
  const selectedCategoryObj = categories.find((c) => c.strCategory === selectedCategory);

  return (
    <Listbox value={selectedCategory} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className="relative w-full min-w-[200px] py-3.5 pl-4 pr-10 
                     text-left bg-stone-900/50 backdrop-blur-sm
                     border border-stone-800/50 rounded-xl
                     text-stone-100 cursor-pointer
                     hover:border-stone-700
                     focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20
                     transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <span className="block truncate">
            {isLoading
              ? 'Loading categories...'
              : selectedCategoryObj?.strCategory || 'All Categories'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronUpDownIcon className="h-5 w-5 text-stone-500" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-50 mt-2 w-full max-h-60 overflow-auto
                       bg-stone-900/95 backdrop-blur-md
                       border border-stone-800/50 rounded-xl
                       shadow-xl shadow-black/20
                       focus:outline-none
                       py-1"
          >
            {/* All Categories Option */}
            <Listbox.Option
              value={null}
              className={({ active }) =>
                `relative cursor-pointer select-none py-3 pl-10 pr-4 
                 transition-colors duration-150
                 ${active ? 'bg-amber-500/10 text-amber-400' : 'text-stone-300'}`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                    All Categories
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-500">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>

            {categories.map((category) => (
              <Listbox.Option
                key={category.idCategory}
                value={category.strCategory}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-3 pl-10 pr-4 
                   transition-colors duration-150
                   ${active ? 'bg-amber-500/10 text-amber-400' : 'text-stone-300'}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {category.strCategory}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-500">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

