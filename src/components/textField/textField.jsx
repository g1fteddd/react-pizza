import React from "react";

import styles from "./textField.module.scss";

const TextField = ({ placeholder, type, name, value, onChange }) => {
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
