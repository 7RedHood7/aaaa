import React, {useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss';
import debounce from "lodash.debounce";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../Redux/Slices/filter/Slice";



export const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const updateSearchValue = useCallback(
        debounce ((str: string) => {
            dispatch(setSearchValue(str));
        }, 1000),
        [setSearchValue]
    );

    const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
        dispatch(setSearchValue(''));
        setValue('')
        inputRef.current?.focus();
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }
    }


    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <div className={styles.input}>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.root}
                placeholder='Поиск пиццы'
            />
            {value &&
                (<svg onClick={onClickClear} className={styles.pics} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>)}
        </div>
    );
};
