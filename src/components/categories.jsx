import React, { useState } from "react";

function Categories() {
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const categories = [
        "Все",
        "Мясные",
        "Вегетерианские",
        "Гриль",
        "Острые",
        "Закрытые"
    ];

    const onClickCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={
                            selectedCategory === category ? "active" : ""
                        }
                        onClick={() => onClickCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
