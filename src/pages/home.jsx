import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { fetchPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";
import { setFilters } from "../redux/slices/filterSlice";

import { typeSorts } from "../components/sort";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pizzas, status } = useSelector((state) => state.pizzas);
    const { categoryId, sort } = useSelector((state) => state.filter);
    const searchValue = useSelector((state) => state.search.searchValue);

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    // Запрос пицц
    const getPizzas = async () => {
        const categoryQuery = categoryId === 0 ? "" : `category=${categoryId}`;
        const sortByWithOrderQury = `sortBy=${sort.property}&order=${sort.order}`;
        const searchQuery = searchValue ? `title=${searchValue}` : "";

        dispatch(
            fetchPizzas({ categoryQuery, sortByWithOrderQury, searchQuery })
        );
    };

    // Если изменили параметры и был первый рендер, то в search params вшиваем фильтры
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.property,
                order: sort.order,
                categoryId
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, searchValue]);

    // На первом рендере проверяем search params и сохраняем в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = typeSorts.find(
                (obj) => obj.property === params.sortProperty
            );
            dispatch(
                setFilters({
                    categoryId: params.categoryId,
                    sort: { ...sort, order: params.order }
                })
            );
            isSearch.current = true;
        }
    }, []);

    // При изменении фильтров по новой запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

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
                {status === "error" ? (
                    <div className="content__error-info">
                        <h2>
                            Произошла ошибка <icon>😕</icon>
                        </h2>
                        <p>
                            К сожалению, не удалось получить пиццы.
                            <br />
                            Обновите страницу или попробуйте позже
                        </p>
                        <button
                            onClick={() => navigate(0)}
                            class="button button--black"
                        >
                            <span>Обновить страницу</span>
                        </button>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === "loading" ? (
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
                )}
            </div>
        </>
    );
};

export default Home;
