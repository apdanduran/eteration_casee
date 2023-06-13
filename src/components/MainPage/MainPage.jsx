import React from 'react'
import SideBar from '../SideBar/SideBar'
import ProductList from '../ProductList/ProductList'
import Basket from '../Basket/Basket'

const MainPage = () => {
    return (
        <main>
            <SideBar />
            <ProductList />
            <Basket />
        </main>
    )
}

export default MainPage