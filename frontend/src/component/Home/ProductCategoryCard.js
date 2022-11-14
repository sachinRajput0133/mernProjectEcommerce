import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./ProductCategoryCard.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const ProductCategoryCard = ({ productsCategory, title,rowId}) => {


    const slideLeft=()=>{
        let slider=document.getElementById('slider'+ rowId )
        slider.scrollLeft=slider.scrollLeft - 500
        
      }
      const slideRight=()=>{
        let slider=document.getElementById('slider' + rowId )
        slider.scrollLeft=slider.scrollLeft + 500
    
      }
  return (
    <Fragment>
      <div className="categorycardBox">
        <h1>{title}</h1>
        <div className="categoryCard" id={"slider"+rowId} >
        <ChevronLeftIcon  className="scroll-arrow scroll-left" onClick={slideLeft} />
          {productsCategory &&
            productsCategory.map((item) => (
                <Link to={`/product/${item._id}`} key={item._id}>
                <img src={item && item?.images[0].url} alt="hello" />
              </Link>
            ))}
            <ChevronRightIcon className="scroll-arrow scroll-right" onClick={slideRight} />
        </div>
       
      </div>
    </Fragment>
  );
};

export default ProductCategoryCard;
