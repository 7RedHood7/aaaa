import './scss/app.scss';
import Home from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./Components/layouts/MainLayout";
import {lazy, Suspense} from "react";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'./Pages/Cart'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */'./Pages/FullPizza'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'./Pages/NotFound'));


function App() {
  return (
      <Routes>
          <Route path="/" element={<MainLayout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={
                  <Suspense fallback={<div>...Загрузка Корзины</div>}>
                      <Cart/>
                  </Suspense>}/>
              <Route path="/pizza/:id" element={
                  <Suspense fallback={<div>...Идет Загрузка</div>}>
                    <FullPizza/>
                  </Suspense>}/>
              <Route path="*" element={
                  <Suspense fallback={<div>...Загрузка</div>}>
                    <NotFound/>
                  </Suspense>}/>
          </Route>
      </Routes>
  );
}

export default App;
