import React, { useEffect, useState, useContext } from "react";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { changeCategoryId } from "../redux/slices/categorySlice";

const Home = () => {
    const { searchValue } = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const categoryId = useSelector((state) => state.category.categoryId);
    const dispatch = useDispatch();

    const [sortType, setSortType] = useState({
        name: "популярности",
        sort: "rating",
        order: "desc"
    });

    useEffect(() => {
        setIsLoading(true);

        const categoryQuery = categoryId === 0 ? "" : `category=${categoryId}`;
        const sortByWithOrderQury = `sortBy=${sortType.sort}&order=${sortType.order}`;
        const searchQuery = searchValue ? `title=${searchValue}` : "";

        fetch(
            `https://647c75c8c0bae2880ad0b72c.mockapi.io/items?${searchQuery}&${categoryQuery}&${sortByWithOrderQury}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPizzas(data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue]);

    const handleChangeCategory = (id) => {
        dispatch(changeCategoryId(id));
    };

    const handleChangeSort = (type) => {
        setSortType(type);
    };
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories
                        value={categoryId}
                        onChangeCategory={handleChangeCategory}
                    />
                    <Sort value={sortType} onChangeSort={handleChangeSort} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading ? (
                        <>
                            <PizzaBlockSkeleton />
                            <PizzaBlockSkeleton />
                            <PizzaBlockSkeleton />
                            <PizzaBlockSkeleton />
                        </>
                    ) : (
                        pizzas.map((obj) => (
                            <PizzaBlock key={obj.id} {...obj} />
                            // <PizzaBlockSkeleton />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
