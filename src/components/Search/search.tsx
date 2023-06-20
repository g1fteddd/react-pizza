import React, { useState } from "react";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./search.module.scss";

import { setSearchValue } from "../../redux/search/slice";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>("");

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 400),
        []
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <input
            value={value}
            onChange={onChangeInput}
            className={styles["search-input"]}
            name="search"
            placeholder="Поиск пиццы..."
            type="text"
        />
    );
};

export default Search;
