import React, {useCallback, useEffect, useRef} from 'react';
import {list} from "../Components/Sort";
import {useSelector} from "react-redux";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../Redux/store";
import {selectFilter} from "../Redux/Slices/filter/Selectors";
import {selectPizzaData} from "../Redux/Slices/pizza/Selectors";
import {setCategoryId, setCurrentPage, setFilters} from "../Redux/Slices/filter/Slice";
import {SearchPizzaParams} from "../Redux/Slices/pizza/Slice";
import {fetchPizza} from "../Redux/Slices/pizza/AsyncActions";
import {Categories, Sort, Pagination, PizzaBlock, Skeleton} from "../Components/";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData);




    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [dispatch])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const fetchPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // await axios.get(`https://66fea5862b9aac9c997cd6fc.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then(res => {
        //         setItems(res.data);
        //         setIsLoading(false);
        //     })
        //     .catch(err => {console.log(err, 'fsdfsf')});

        // const res = await axios.get(`https://66fea5862b9aac9c997cd6fc.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
        // setItems(res.data);
        // setIsLoading(false);

        dispatch(
            fetchPizza({
            order, sortBy, category, search, currentPage: String(currentPage)
        }));
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId: categoryId > 0 ? categoryId : null,
                currentPage
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, currentPage, navigate])



    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
            const sort = list.find((obj) => obj.sortProperty === params.sortBy);

            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || list[0],
            }))
            isMounted.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if(!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = items.map((item: any) => (
        <PizzaBlock key={item.id} title={item.title} price={item.price} image={item.imageUrl} sizes={item.sizes} type={item.types} id={item.id} />))
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (<div><h2>ОШИБКА</h2></div>) :
                    (<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>)
            }
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;