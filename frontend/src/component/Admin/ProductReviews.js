import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,

  deleteReviews,

  getAllReviews,
} from "../../actions/productAction";
import StarIcon from '@mui/icons-material/Star';

import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { Button } from "@mui/material";
import {
  
  DELETE_REVIEW_RESET,
} from "../../constants/productConstants";
import "./ProductReviews.css"
const ProductReviews = () => {
  const dispatch = useDispatch();
  // const { loading,error, products }=useSelector(state=>state.products )
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews ,loading } = useSelector((state) => state.productReviews);
  const navigate = useNavigate();

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId));
  };
const [productId,setProductId]=useState("")
  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 150, flex: 0.3 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,

      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
      // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((review) =>
      rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
      })
    );

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId))
  };

  useEffect(() => {
    if (productId.length === 24) {
        dispatch(getAllReviews(productId));
      }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, isDeleted, deleteError, navigate,productId]);

  return (
    <Fragment>
      <MetaData title="All Reviews -Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            action=""
            onSubmit={productReviewSubmitHandler}
            className="productReviewForm"
          >
            <h1  className="productReviewsFormHeading">All Reviews</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product ID"
                required
                id=""
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

        {
            reviews && reviews.length >0 ?   <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> : <h1 className="productReviewsFormHeading2"   >
            No reviews found
          </h1>
        }
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
