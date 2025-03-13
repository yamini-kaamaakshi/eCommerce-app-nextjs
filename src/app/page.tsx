"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
    { id: 1, name: "Electronics", slug: "electronics", image: "/images/electronics.jpg" },
    { id: 2, name: "Clothing", slug: "clothing", image: "/images/clothing.jpg" },
    { id: 3, name: "Home Appliances", slug: "home-appliances", image: "/images/home-appliances.jpg" },
    { id: 4, name: "Sports & Fitness", slug: "sports", image: "/images/sports.jpg" },
    { id: 5, name: "Furniture", slug: "furniture", image: "/images/furniture.jpg" },
];

export default function Home() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Handle checkbox change
    const handleCategoryChange = (slug: string) => {
        setSelectedCategories((prev) =>
            prev.includes(slug) ? prev.filter((cat) => cat !== slug) : [...prev, slug]
        );
    };

    // Filter categories based on selection
    const filteredCategories = selectedCategories.length > 0
        ? categories.filter((category) => selectedCategories.includes(category.slug))
        : categories;

    return (
        <div className="container mx-auto py-10 flex">
            {/* Sidebar */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={category.slug}
                            value={category.slug}
                            checked={selectedCategories.includes(category.slug)}
                            onChange={() => handleCategoryChange(category.slug)}
                            className="mr-2"
                        />
                        <label htmlFor={category.slug} className="text-gray-700">{category.name}</label>
                    </div>
                ))}
            </div>

            {/* Product Categories Display */}
            <div className="w-3/4 px-6">
                <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
                <div className="grid grid-cols-3 gap-6">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products/${category.slug}`}
                                className="p-6 border rounded-lg shadow text-center bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded" />
                                <h2 className="text-xl font-semibold">{category.name}</h2>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-600">No categories selected.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
