import React from "react";
import styles from "./textField.module.scss";

const TextField = ({ placeholder, type, name, value, onChange }) => {
    return (
        <input
            onChange={onChange}
            type={type}
            name={name}
            id={name}
            className={styles["search-input"]}
            placeholder={placeholder}
        />
    );
};

export default TextField;
