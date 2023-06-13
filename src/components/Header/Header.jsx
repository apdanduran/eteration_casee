import React, { useState } from 'react';
import './Header.css';
import { useSelector } from 'react-redux';



const Header = () => {
  const { backUpData, basket } = useSelector((state) => state.products);
  const [searchDatas, setSearchDatas] = useState([])
  let totalPrice = basket.reduce((acc, current) => acc + (Number(current.price) * current.quantity), 0);
  const headerSearchInput = (e) => {
    const value = e.target.value;
    if (value === "") return;
    const filteredData = backUpData.filter((el) => {
      return el.name.toLowerCase().includes(value);
    });
    setSearchDatas([...filteredData]);
  };

  return (
    <div className="header">
      <div className='textLogo__searchBox'>
        <div className='textLogo' >
          Eteration
        </div>
        <div className="search-box">
          <input type="text" onChange={(e) => headerSearchInput(e)} className="search-input" placeholder="Search" />
          <span className="search-icon" />
          {searchDatas.length > 0 && <div className='searchBoxResult'>
            {
              searchDatas.map((el, idx) => <div key={idx} onClick={() => window.location.href = "/products" + el.id} className="searchData___header">
                {el.name}
              </div>
              )
            }
          </div>}
        </div>
      </div>

      <div className='headerRightSide'>
        <div className='totalAmount'>
          <span className="totalAmount-icon" />
          <p>
            {totalPrice}₺
          </p>
        </div>
        <div className='person'>
          <span className="person-icon" />
          <p>
            Duran
          </p>
        </div>
      </div>

    </div >

  )
}

export default Header