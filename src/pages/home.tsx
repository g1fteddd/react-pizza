import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";

import { searchSelector } from "../redux/search/selectors";
import { useAppDispatch } from "../redux/store";
import { pizzasSelector } from "../redux/pizzas/selectors";
import { fetchPizzas } from "../redux/pizzas/asyncActions";
import { Status } from "../redux/pizzas/types";
import { filterSelector } from "../redux/filter/selectors";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { pizzas, status } = useSelector(pizzasSelector);
    const { categoryId, sort } = useSelector(filterSelector);
    const { searchValue } = useSelector(searchSelector);

    const getPizzas = async () => {
        const categoryQuery = categoryId === 0 ? "" : `category=${categoryId}`;
        const sortByWithOrderQury = `sortBy=${sort.property}&order=${sort.order}`;
        const searchQuery = searchValue ? `title=${searchValue}` : "";

        dispatch(
            fetchPizzas({ categoryQuery, sortByWithOrderQury, searchQuery })
        );
    };

    useEffect(() => {
        getPizzas();

        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue]);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {status === Status.ERROR ? (
                    <div className="content__error-info">
                        <h2>
                            Произошла ошибка <span>😕</span>
                        </h2>
                        <p>
                            К сожалению, не удалось получить пиццы.
                            <br />
                            Обновите страницу или попробуйте позже
                        </p>
                        <button
                            onClick={() => navigate(0)}
                            className="button button--black"
                        >
                            <span>Обновить страницу</span>
                        </button>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === Status.LOADING ? (
                            <>
                                <PizzaBlockSkeleton />
                                <PizzaBlockSkeleton />
                                <PizzaBlockSkeleton />
                                <PizzaBlockSkeleton />
                            </>
                        ) : (
                            pizzas.map((obj: any) => (
                                <PizzaBlock key={obj.id} {...obj} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
