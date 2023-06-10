import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";

const Home = () => {
    const dispatch = useDispatch();

    const pizzas = useSelector((state) => state.pizzas.pizzas);
    const { categoryId, sort } = useSelector((state) => state.filter);
    const searchValue = useSelector((state) => state.search.searchValue);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const categoryQuery = categoryId === 0 ? "" : `category=${categoryId}`;
        const sortByWithOrderQury = `sortBy=${sort.property}&order=${sort.order}`;
        const searchQuery = searchValue ? `title=${searchValue}` : "";

        fetch(
            `https://647c75c8c0bae2880ad0b72c.mockapi.io/items?${searchQuery}&${categoryQuery}&${sortByWithOrderQury}`
        )
            .then((res) => res.json())
            .then((data) => {
                dispatch(setPizzas(data));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, dispatch]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
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
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
