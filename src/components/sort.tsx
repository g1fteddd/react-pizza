import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";
import { useEffect } from "react";
import { filterSortSelector } from "../redux/filter/selectors";
import { setSort } from "../redux/filter/slice";

interface ITypeSort {
    name: string;
    property: string;
}

export const typeSorts: ITypeSort[] = [
    { name: "популярности", property: "rating" },
    { name: "цене", property: "price" },
    { name: "алфавиту", property: "title" }
];

const Sort: React.FC = () => {
    const dispatch = useDispatch();

    const sort = useSelector(filterSortSelector);

    const [open, setOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleClickOrder = () => {
        dispatch(
            setSort({
                ...sort,
                order: sort.order === "asc" ? "desc" : "asc"
            })
        );
    };

    const handleClickSort = (sort: ITypeSort) => {
        setOpen(false);
        dispatch(setSort({ ...sort, order: "desc" }));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                !event.composedPath().includes(sortRef.current as EventTarget)
            ) {
                setOpen(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);

        return () =>
            document.body.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    transform={sort.order === "asc" ? "rotate(-180 0 0)" : ""}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClickOrder}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>
            {open && (
                <div className="sort__popup">
                    <ul>
                        {typeSorts.map((typeSort, index) => (
                            <li
                                key={index}
                                onClick={() => handleClickSort(typeSort)}
                                className={
                                    sort.property === typeSort.property
                                        ? "active"
                                        : ""
                                }
                            >
                                {typeSort.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default React.memo(Sort);
