import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectICartItemById } from "../../redux/slices/cart/selectors";
import { Link } from "react-router-dom";
import { ICartItem } from "../../redux/slices/cart/types";
import { addPizza } from "../../redux/slices/cart/slice";

export const typeNames: string[] = ["тонкое", "традиционное"];

interface IPizzaBlock {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: Array<number>;
    types: Array<number>;
    rating: number;
}

const PizzaBlock: React.FC<IPizzaBlock> = ({
    id,
    title,
    price,
    imageUrl,
    sizes,
    types
}) => {
    const [selectedType, setSelectedType] = useState<number>(types[0]);
    const [selectedSize, setSelectedSize] = useState<number>(0);
    const dispatch = useDispatch();
    const pizzaItem = useSelector(selectICartItemById(id));
    const pizzaCount = pizzaItem ? pizzaItem.count : 0;
    const addCartPizza = () => {
        const item: ICartItem = {
            id,
            title,
            price,
            imageUrl,
            size: sizes[selectedSize],
            type: selectedType,
            count: 0
        };
        dispatch(addPizza(item));
    };

    return (
        <div className="pizza-block">
            <Link to={`pizza/${id}`}>
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((typeId) => (
                        <li
                            key={typeId}
                            onClick={() => setSelectedType(typeId)}
                            className={selectedType === typeId ? "active" : ""}
                        >
                            {typeNames[typeId]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedSize(index)}
                            className={selectedSize === index ? "active" : ""}
                        >
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <button
                    onClick={addCartPizza}
                    className="button button--outline button--add"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {pizzaCount > 0 && <i>{pizzaCount}</i>}
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;
