import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, saveBasket } from '../../redux/reducers';
import './Basket.css'

const Basket = () => {

    const { basket } = useSelector(state => state.products)
    let totalPrice = basket.reduce((acc, current) => acc + (Number(current.price) * current.quantity), 0);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket?.length > 0) {
            try {
                const parsedBasket = JSON.parse(storedBasket);
                dispatch(saveBasket(parsedBasket));
            } catch (error) {
                console.log("Error parsing JSON:", error);
            }
        }
    }, []);

    return (
        <div className='basketAndTotalPrice'>
            {basket.length > 0 && <div className='basketCover'>
                {
                    basket.map((pro, idx) => <div key={idx} className='basket__product'>
                        <div>
                            <p className='basket__productName'>{pro.name}</p>
                            <p className='basket__productPrice'>{pro.price}₺</p>
                        </div>
                        <div className='basket__controls'>
                            <button className="basket__minus" onClick={() => dispatch(removeToCart(pro))}>-</button>
                            <input className='basket__input' type="text" readOnly value={pro.quantity} />
                            <button className="basket__plus" onClick={() => dispatch(addToCart(pro))}>+</button>
                        </div>
                    </div>
                    )
                }
            </div>}
            {
                basket.length > 0 && <div className='totalPrice__checkOut'>
                    <div className='basket__totalPriceCover'>
                        Total price:
                        <p className='basket__totalPrice'>
                            {totalPrice.toFixed(2)}₺
                        </p>
                    </div>
                    <button className='basket__checkOutBtn'>
                        Checkout
                    </button>
                </div>
            }
        </div>

    )
}

export default Basket;