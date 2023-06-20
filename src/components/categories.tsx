import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategorySelector } from "../redux/filter/selectors";
import { setCategoryId } from "../redux/filter/slice";

const Categories: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    const categories: string[] = [
        "Все",
        "Мясные",
        "Вегетерианские",
        "Гриль",
        "Острые",
        "Закрытые"
    ];

    console.log("rerender Categories");

    const categoryId = useSelector(filterCategorySelector);

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
});

export default Categories;
