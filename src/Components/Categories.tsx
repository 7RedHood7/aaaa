import React, {memo} from 'react';

type CategoriesProps = {
    value: number;
    onChangeCategory: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC<CategoriesProps> = memo(({value, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((cat, index) => (
                <li key={cat} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>{cat}</li>
                ))}
            </ul>
        </div>
    );
})
