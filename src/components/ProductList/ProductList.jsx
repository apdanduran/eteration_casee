import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchProducts } from '../../redux/reducers';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import './ProductList.css'

let PageSize = 12;
const ProductList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);


  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const openPage = (pro) => navigate('/products/' + pro.id);

  return (
    <div className='productList__pagination'>
      <div className='productList'>
        {
          currentTableData.map((pro) => {
            return (
              <div key={pro.id} className='productList__productCart'>
                <img className='productList__img' onClick={() => openPage(pro)} src={pro.image} alt={pro.image} />
                <p className='productList__productPrice'>
                  {pro.price}₺
                </p>
                <p className='productList__productName'>
                  {pro.name}
                </p>
                <button className='productList__productButton' onClick={() => dispatch(addToCart(pro))}>
                  Add to Cart
                </button>
              </div>
            );
          })

        }

      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>

  );

}

export default ProductList