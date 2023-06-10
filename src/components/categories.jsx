import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

function Categories() {
    const dispatch = useDispatch();

    const categories = [
        "Все",
        "Мясные",
        "Вегетерианские",
        "Гриль",
        "Острые",
        "Закрытые"
    ];

    const categoryId = useSelector((state) => state.filter.categoryId);

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
}

export default Categories;
