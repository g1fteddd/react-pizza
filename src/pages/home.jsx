import React, { useEffect, useState } from "react";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock, { PizzaBlockSkeleton } from "../components/pizzaBlock";

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://647c75c8c0bae2880ad0b72c.mockapi.io/items")
            .then((res) => res.json())
            .then((data) => setPizzas(data))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
        window.scrollTo(0, 0);
    }, []);
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
                            // <PizzaBlockSkeleton />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
