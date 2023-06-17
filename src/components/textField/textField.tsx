import React from "react";

import styles from "./textField.module.scss";

interface ITextField {
    placeholder: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<ITextField> = ({
    placeholder,
    type,
    name,
    value,
    onChange
}) => {
    return (
        <input
            value={value}
            onChange={onChange}
            type={type}
            id={name}
            name={name}
            className={styles["search-input"]}
            placeholder={placeholder}
        />
    );
};

export default TextField;
