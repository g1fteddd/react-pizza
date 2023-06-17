import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PizzaInfo: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { pizzaId } = useParams();

    useEffect(() => {
        const fetchPizzaById = async () => {
            const res = await axios.get(
                "https://647c75c8c0bae2880ad0b72c.mockapi.io/items/" + pizzaId
            );
            setPizza(res.data);
        };
        fetchPizzaById();
    }, [pizzaId]);

    if (!pizza) {
        return "Загрузка...";
    }

    return (
        <div className="container">
            <h2>{pizza.title}</h2>
            <img src={pizza.imageUrl} alt="Изображение пиццы" width="300" />
            <p>{pizza.price} ₽</p>
        </div>
    );
};

export default PizzaInfo;
