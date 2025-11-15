"use client";

import { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-[family-name:var(--font-montserrat)] font-semibold mb-4">
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{category.name}</span>
              <span className={`text-sm ${
                selectedCategory === category.id ? "text-gray-300" : "text-gray-500"
              }`}>
                ({category.count})
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
