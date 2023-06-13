import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProductDetail.css'
import { addToCart, fetchProduct } from '../../redux/reducers';
import Basket from '../Basket/Basket';
import Loading from '../Loading/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const { productDetail, loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id])

  if (loading) return <Loading />
  if (error) return <div>Error: {error}</div>;
  return (
    <div className='productDetailPage'>
      {
        <div className='productDetail__cardCover'>
          <img src={productDetail.image} alt={productDetail.image} />
          <div className='productDetail__cardDetail'>
            <p className='productDetail__modelName'>
              {
                productDetail.model
              }
            </p>
            <p className='productDetail_productPrice'>
              {
                productDetail.price + "₺"
              }
            </p>
            <button className='productDetail__addToCart' onClick={() => dispatch(addToCart(productDetail))}>
              Add to cart
            </button>
            <div className='productDetail__desc'>
              {
                productDetail.description
              }
            </div>
          </div>
        </div>

      }
      <Basket />
    </div>

  )
}

export default ProductDetail