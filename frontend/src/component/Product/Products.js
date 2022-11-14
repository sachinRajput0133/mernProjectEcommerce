import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../Loader/Loader";
import Pagination from "react-js-pagination";
import "./Products.css";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import {  toast } from 'react-toastify';
import MetaData from "../MetaData";


const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,50000]);
  const [category, setCategory] = useState();
  const [ratings, setRatings] = useState(0);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Electronics",
    "Clothing",
    "Shoes",
  ];
 const priceArray=[
  {
    value:[0,500],
    label:"0 - ₹500"
  },
  {
    value:[500,1000],
    label:"₹500 - ₹1,000"
  },
  {
    value:[1000,2500],
    label:"₹1,000 - ₹2,500"
  },
  {
    value:[2500,5000],
    label:"₹2,500 - ₹5,000"
  },
  {
    value:[5000,200000],
    label:"Above ₹5000"
  }
 ]
 const [priceColorToggle ,setpriceColorToggle]=useState({
  avtiveObject:null,
  priceArray
 })
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    window.scroll(0,0)
  };


  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const {
    loading,
    error,
    productsCount,
    products,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let count = filteredProductsCount;

  // price toggle active
const setPriceHandler=(priceValue,index)=>{
  setPrice(priceValue)
    setpriceColorToggle({...priceColorToggle,activeObject:priceColorToggle.priceArray[index]})

}

const toggleActiveStyle=(index)=>{
  if(priceColorToggle.priceArray[index] === priceColorToggle.activeObject ){
    return "active"
  }else {
    return "inactive"
  }
}


// useeffect
  useEffect(() => {
  if(error){
    toast.error(error)
    dispatch(clearErrors())
  }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    // eslint-disable-next-line
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title="PRODUCTS -- AMAZON" />
            <div className="productContainer" >
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {   
            products && products.length >0 ?
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              )) :(
                <h1 className="productsResultNotFound" >No Result !!</h1>
              )
            
            
            }
          </div>

            </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
            
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={200000}
            
            />
            <Typography>Price</Typography>
                  <ul className="priceBox">
                    {
                   priceColorToggle.priceArray.map((price ,index)=>(
                        <li key={index}
                         className={toggleActiveStyle(index)}
                          onClick={()=>setPriceHandler(price.value,index)  } >
                           {price.label}
                        </li>
                      ))
                    }
                  </ul>

            <Typography>Cetagories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}{" "}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
       
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
