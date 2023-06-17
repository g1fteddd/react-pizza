import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterSelector, setCategoryId } from "../redux/slices/filterSlice";

const Categories: React.FC = () => {
    const dispatch = useDispatch();

    const categories: string[] = [
        "Все",
        "Мясные",
        "Вегетерианские",
        "Гриль",
        "Острые",
        "Закрытые"
    ];

    const { categoryId } = useSelector(filterSelector);

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={categoryId === index ? "active" : ""}
                        onClick={() => dispatch(setCategoryId(index))}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
