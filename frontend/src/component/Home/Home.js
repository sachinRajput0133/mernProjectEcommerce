import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProduct,

  getProductByCategoryClothing,
  getProductByCategoryElectronics,
  getProductByCategoryShoes,
} from "../../actions/productAction";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import "./Home.css";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ProductCategoryCard from "./ProductCategoryCard";
import "./ProductCategoryCard.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const {
    loading: shoesLoading,
    error: shoesError,
    productsCategoryShoes,
  } = useSelector((state) => state.productByCategoryShoes);
  const {
    loading: electronicsLoading,
    error: electronicsError,
    productsCategoryElectronics,
  } = useSelector((state) => state.productByCategoryElectronics);
  const {
    loading: cloathingLoading,
    error: clothingError,
    productsCategoryClothings,
  } = useSelector((state) => state.productByCategoryClothing);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (shoesError) {
      toast.error(shoesError);
      dispatch(clearErrors());
    }
    if (electronicsError) {
      toast.error(electronicsError);
      dispatch(clearErrors());
    }
    if (clothingError) {
      toast.error(clothingError);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
    // dispatch(getProductByCategory("Shoes"))
    dispatch(getProductByCategoryShoes("Shoes"));
    dispatch(getProductByCategoryElectronics("Electronics"));
    dispatch(getProductByCategoryClothing("Clothing"));
   
  }, [dispatch, error,clothingError,electronicsError,shoesError]);

 
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div
            className="banner"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url("https://img.freepik.com/premium-photo/banner-photo-beautiful-young-happy-excited-woman-striped-sweater-with-many-colorful-shopping-bags-credit-card-hands-isolated-yellow-background_283617-4702.jpg?w=1480")`,
              // background:"grey",
              backgroundPosition: "center center",
            }}
          >
            <div className="banner-contents">
              <h1 className="banner-title">BUY 1 GET 2 FREE</h1>
              <div className="banner-buttons">
                <button
                  className="banner-button"
                  onClick={()=>navigate("/products") }
                >
                  SHOP NOW
                </button>
              </div>
            </div>
            {/* <div className="banner-fade-bottom">

         </div> */}
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container containerMe" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
         
          
           {
            shoesLoading ? <Loader/> :(
              <div className="productCategoryContainer slider">
              <ProductCategoryCard rowId={1}  Loading={shoesLoading} productsCategory={productsCategoryShoes} title="Shoes" />
            </div>

            )
           } 

           {
            electronicsLoading ? <Loader/>:(
              <div className="productCategoryContainer slider">
              <ProductCategoryCard rowId={2}  Loading={electronicsLoading} productsCategory={productsCategoryElectronics} title="Electronics" />
            </div>
              
            )
           }
           {

            cloathingLoading? <Loader/> :(

            <div className="productCategoryContainer slider">
              <ProductCategoryCard rowId={3}  Loading={cloathingLoading} productsCategory={productsCategoryClothings} title="Clothing" />
            </div>

            )
           }

         
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
