import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeProductList, setBackUpData } from '../../redux/reducers';

const SideBar = () => {
    const sortByArr = ["Old to new", "New to old", "Price high to low", "Price low to high"]
    const dispatch = useDispatch();
    const { data, backUpData } = useSelector((state) => state.products);
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const returnBrands = (backUpData) => {
        return Array.from(new Set([...backUpData].map((car) => car.brand))).sort();
    }

    const returnModels = (backUpData) => {
        let tempModel = [...backUpData].filter((pro) => pro.brand === selectedBrand)
        return Array.from(new Set([...tempModel].map((car) => car.model))).sort();
    }


    useEffect(() => {
        if (brands.length === 0 && data.length > 0) {
            dispatch(setBackUpData([...data]))
            const tempBrands = returnBrands(data);
            setBrands(tempBrands)
        }
    }, [data])

    useEffect(() => {
        if (selectedBrand !== "") {
            let temp = [...backUpData].filter((pro) => pro.brand === selectedBrand)
            dispatch(changeProductList(temp));
            setModels(Array.from(new Set([...temp].map((car) => car.model))).sort());
        } else {
            dispatch(changeProductList([...backUpData]))
        }
    }, [selectedBrand])


    useEffect(() => {
        if (selectedModel !== "") {
            let tempBrand = [...backUpData].filter((pro) => pro.model === selectedModel && pro.brand === selectedBrand)
            dispatch(changeProductList(tempBrand));
        } else {
            let tempModel = [...backUpData].filter((pro) => pro.brand === selectedBrand)
            dispatch(changeProductList(tempModel));
        }
    }, [selectedModel])

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const sortByFunc = (name, selectedBrand) => {
        let sortedCars = [];
        switch (name) {
            case sortByArr[0]:
                sortedCars = [...backUpData].sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                });
                break;
            case sortByArr[1]:
                sortedCars = [...backUpData].sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                break;
            case sortByArr[2]:
                sortedCars = [...backUpData].sort((a, b) => {
                    return parseFloat(b.price) - parseFloat(a.price);
                });
                break;
            case sortByArr[3]:
                sortedCars = [...backUpData].sort((a, b) => {
                    return parseFloat(a.price) - parseFloat(b.price);
                });
                break;
            default:
                break;
        }
        if (selectedBrand !== "") {
            let tempForSideBarSort = [...sortedCars].filter((pro) => pro.brand === selectedBrand)
            dispatch(changeProductList(tempForSideBarSort))
            if (selectedModel !== "") {
                dispatch(changeProductList([...tempForSideBarSort].filter((pro) => pro.model === selectedModel)))
            }
        } else {
            dispatch(changeProductList([...sortedCars]))
        }
        dispatch(setBackUpData([...sortedCars]))
    }


    const sortBrandsFunc = (e, selectedBrand, name) => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        setSelectedModel("")
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        if (selectedBrand === name)
            setSelectedBrand("")
        else {
            setSelectedBrand(name);
            e.target.checked = true
        }
    }

    const sortModelsFunc = (e, selectedModel, name) => {
        var checkboxes = document.querySelectorAll('.sideBar__model');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        if (selectedModel === name)
            setSelectedModel("")
        else {
            setSelectedModel(name);
            e.target.checked = true
        }
    }

    const searchBrands = (e) => {
        const filteredData = returnBrands(backUpData).filter((el) => {
            if (e.target.value === '') {
                return returnBrands(backUpData);
            }
            else {
                return el.toLowerCase().includes(e.target.value)
            }
        })
        setBrands([...filteredData])
    }


    const searchModels = (e) => {
        const filteredData = returnModels(backUpData).filter((el) => {
            if (e.target.value === '') {
                return returnModels(backUpData);
            }
            else {
                return el.toLowerCase().includes(e.target.value)
            }
        })
        setModels([...filteredData])
    }

    return (
        <div className='sideBar'>
            <div>
                SortBy
                <div className='sideBar__sortBy'>
                    {
                        sortByArr.map((name, idx) => <div key={idx}>
                            <input onClick={() => sortByFunc(name, selectedBrand)} type="radio" id={camelize(name)} name="sortBy" />
                            <label htmlFor={camelize(name)} >{name}</label>
                        </div>
                        )
                    }
                </div>
            </div>
            <div>
                Brands
                <div className='sideBar__brands'>
                    <div className="sideBar__brands__searchBox">
                        <input type="text" onChange={(e) => searchBrands(e, brands)} className="search-input" placeholder="Search" />
                        <span className="search-icon" />
                    </div>
                    <div className='sideBar__brandOptions'>
                        {
                            brands.map((name, idx) => <div key={idx}>
                                <input defaultChecked={name === selectedBrand} className='sideBar__brand'
                                    onClick={(e) => sortBrandsFunc(e, selectedBrand, name)}
                                    type="checkbox" id={camelize(name)} />
                                <label htmlFor={camelize(name)} >{name}</label>
                                <br />
                            </div>
                            )
                        }
                    </div>

                </div>
            </div>
            {selectedBrand !== "" && <div>
                Models
                <div className='sideBar__models'>
                    <div className="sideBar__models__searchBox">
                        <input type="text" onChange={(e) => searchModels(e, models)} className="search-input" placeholder="Search" />
                        <span className="search-icon" />
                    </div>
                    <div className='sideBar__modelOptions'>
                        {
                            models.map((name, idx) => <div key={idx}>
                                <input defaultChecked={name === selectedModel} className='sideBar__model'
                                    onClick={(e) => sortModelsFunc(e, selectedModel, name)} type="checkbox" id={camelize(name)} />
                                <label htmlFor={camelize(name)} >{name}</label>
                                <br />
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default SideBar