import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState <{
        imageUrl: string,
        title: string,
        price: number,
    }>({
        imageUrl: '',
        title: '',
        price: 0,
    });
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://66fea5862b9aac9c997cd6fc.mockapi.io/items/` + id)
                setPizza(data)
            } catch (error){
                alert(error)
                navigate('/')
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>...Загрузка</>
    }
    return (
        <div className="container">
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
                <Link to={"/sdfgsdf"}>
                    <button className="button button--outline button--add">
                        <span>Назад</span>
                    </button>
                </Link>
        </div>
    );
};

export default FullPizza;