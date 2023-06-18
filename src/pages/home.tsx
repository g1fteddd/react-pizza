import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    Status,
    fetchPizzas,
    pizzasSelector
} from "../redux/slices/pizzasSlice";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";
import { filterSelector, setFilters } from "../redux/slices/filterSlice";

import { typeSorts } from "../components/sort";
import { searchSelector } from "../redux/slices/searchSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { pizzas, status } = useSelector(pizzasSelector);
    const { categoryId, sort } = useSelector(filterSelector);
    const { searchValue } = useSelector(searchSelector);

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
    }, [categoryId, sort, searchValue, navigate]);

    // На первом рендере проверяем search params и сохраняем в Redux
    useEffect(() => {
        const categoryId = searchParams.get("categoryId");
        const sortProperty = searchParams.get("sortProperty");
        const order = searchParams.get("order");

        const sort = typeSorts.find((obj) => obj.property === sortProperty);

        if (categoryId && sortProperty && order && sort) {
            dispatch(
                setFilters({
                    categoryId: Number(categoryId),
                    sort: { ...sort, order: order }
                })
            );

            isSearch.current = true;
        } else {
            navigate("/");
        }
    }, [dispatch]);

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
