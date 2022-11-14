import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MetaData from "../MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Button, DialogActions, Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {success ,error:reviewError}=useSelector(state=>state.newReview)
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const [quantity, setQuantity] = useState(1);

  // console.log(quantity);

  const increaseQuantity = () => {
    if (quantity >= product.stock) return toast.error("Limited Product Stock");

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1)
      return toast.error("Minimum 1 Product quantity Required");
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const reviewSubmitHandler=()=>{
    const myForm=new FormData()
    myForm.set("rating",rating);
    myForm.set("comment",comment);
    myForm.set("productId",id)
    dispatch(newReview(myForm))
    setOpen(false)
  }

  
  const options = {
    
   
  
    // size: "large",
    value: product?.ratings,
    readOnly:true,
    precision:0.5,
  };
  
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
     if(reviewError){
      toast.error(reviewError)
      dispatch(clearErrors())
     }

     if(success){
      toast.success("Review Submitted Successfully")
      dispatch({type:NEW_REVIEW_RESET})
     }
    dispatch(getProductDetails(id));
    window.scroll(0,0)
  }, [dispatch, id, error,reviewError,success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}--AMAZON`} />
          <div className="productDetails">
            <div>
              <Carousel className="caro">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      src={item.url}
                      alt={`${i} Slide`}
                      key={item.url}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span" >({product.numOfReviews} Reviews )</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                {
                product &&  product.stock < 1 ? <button
                  disabled={ true}
                  onClick={addToCartHandler}
                  className="addToCartDisabled"
                >
                  Add To Cart
                </button> :  <button
                    disabled={ false}
                    onClick={addToCartHandler}
                    className="addToCartActive"
                  >
                    Add To Cart
                  </button>
                } 
                </div>
                <p>
                  Status:{""}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detalisBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                name=""
                id=""
                className="submitDialogTextArea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                cols="30"
                rows="5"
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}  >Submit</Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
