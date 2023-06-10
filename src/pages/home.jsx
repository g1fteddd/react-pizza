import React, { useEffect, useState } from "react";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/categorySlice";
import { setSortType } from "../redux/slices/sortSlice";
import { setPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
    const pizzas = useSelector((state) => state.pizzas.pizzas);
    const categoryId = useSelector((state) => state.category.categoryId);
    const sortType = useSelector((state) => state.sort.sortType);
    const searchValue = useSelector((state) => state.search.searchValue);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

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
                dispatch(setPizzas(data));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, dispatch]);

    const handleChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const handleChangeSort = (type) => {
        dispatch(setSortType(type));
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
