import axios from "axios";
import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
 
  PRODUCT_BY_CATEGORY_CLOTHING_FAIL,
 
  PRODUCT_BY_CATEGORY_CLOTHING_REQUEST,
 
  PRODUCT_BY_CATEGORY_CLOTHING_SUCCESS,
 
  PRODUCT_BY_CATEGORY_ELECTRONICS_FAIL,
 
  PRODUCT_BY_CATEGORY_ELECTRONICS_REQUEST,
 
  PRODUCT_BY_CATEGORY_ELECTRONICS_SUCCESS,
 
  PRODUCT_BY_CATEGORY_SHOES_FAIL,
 
  PRODUCT_BY_CATEGORY_SHOES_REQUEST,
 
  PRODUCT_BY_CATEGORY_SHOES_SUCCESS,
 
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Get product by category
export const getProductByCategoryShoes = (category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_BY_CATEGORY_SHOES_REQUEST,
      });
     
    
     const   link = `/api/v1/products?category=${category}`;
     

      const { data } = await axios.get(link);

      dispatch({
        type: PRODUCT_BY_CATEGORY_SHOES_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_BY_CATEGORY_SHOES_FAIL,
        payload: err.response.data.message,
      });
    }
  };
  // Get product by category
export const getProductByCategoryElectronics = (category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_BY_CATEGORY_ELECTRONICS_REQUEST,
      });
     
    
     const   link = `/api/v1/products?category=${category}`;
     

      const { data } = await axios.get(link);

      dispatch({
        type: PRODUCT_BY_CATEGORY_ELECTRONICS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_BY_CATEGORY_ELECTRONICS_FAIL,
        payload: err.response.data.message,
      });
    }
  };
  // Get product by category
export const getProductByCategoryClothing = (category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_BY_CATEGORY_CLOTHING_REQUEST,
      });
     
    
     const   link = `/api/v1/products?category=${category}`;
     

      const { data } = await axios.get(link);

      dispatch({
        type: PRODUCT_BY_CATEGORY_CLOTHING_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_BY_CATEGORY_CLOTHING_FAIL,
        payload: err.response.data.message,
      });
    }
  };

// Get all products for admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");
  
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create product--admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Update product--admin
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Delete product--admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

// newReview
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Get all reviews of a product--Admin
export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({
        type: ALL_REVIEW_REQUEST,
      });
      
  
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (err) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: err.response.data.message,
      });
    }
  };

// Delete reviews of a product--Admin
export const deleteReviews = (reviewId,productId) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_REVIEW_REQUEST,
      });
      
  
      const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (err) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: err.response.data.message,
      });
    }
  };

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
