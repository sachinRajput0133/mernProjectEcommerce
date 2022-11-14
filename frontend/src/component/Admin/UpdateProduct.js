import React, { Fragment, useEffect } from 'react'
import MetaData from '../MetaData'
import "./NewProduct.css"
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StoreIcon from '@mui/icons-material/Store';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {  UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
const UpdateProduct = () => {
    const navigate=useNavigate()
    const {id:productId}=useParams()
    

const dispatch=useDispatch()
const {loading,error:updateError,isUpdated}=useSelector(state=>state.product)
const {error,product}=useSelector(state=>state.productDetails)
const [name,setName]=useState("")
const [price,setPrice]=useState(0)
const [description,setDescription]=useState("")
const [category,setCategory]=useState("")
const [stock,setStock]=useState(0)
const [oldImages, setOldImages] = useState([])
const [images,setImages]=useState([])
const [imagesPreview,setImagesPreview]=useState([])

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];





const updateProductSubmitHandler=(e)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.set("name",name)
    myForm.set("price",price)
    myForm.set("description",description)
    myForm.set("category",category)
    myForm.set("stock",stock)

    images.forEach((image)=>{
    myForm.append("images",image)
    })

   dispatch(updateProduct(productId,myForm))


}

const updateProductImagesChange=(e)=>{
    const files=Array.from(e.target.files)

   setImages([])
    setImagesPreview([])
 setOldImages([])
    files.forEach((file)=>{
        const reader=new FileReader()
        reader.onload=()=>{
           if(reader.readyState===2){
            setImagesPreview((old)=>[...old,reader.result])
            setImages((old)=>[...old,reader.result])

           }
        }
        reader.readAsDataURL(file)

    })
}
useEffect(() => {
    if(product && product._id !==productId ){
        dispatch(getProductDetails(productId))
    }else{
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setCategory(product.category)
        setStock(product.stock)
        setOldImages(product.images)
}
  
    if(error){
        toast.error(error)
        dispatch(clearErrors())
    }
    if(updateError){
        toast.error(updateError)
        dispatch(clearErrors())
    }
    
    if(isUpdated){
        toast.success("Product Updated Successfully")
        
        navigate("/admin/dashboard")
        dispatch({type:UPDATE_PRODUCT_RESET}) 
    }
    
    
    }, [dispatch,error,navigate,isUpdated,product,productId,updateError])
  return (
   <Fragment>

    <MetaData title="Create Product"/>
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form action="" 
            onSubmit={updateProductSubmitHandler}
            className='createProductForm'
            encType='mltipart/form-data'
            
            >
                <div>
                    <SpellcheckIcon/>
                    <input 
                    type="text" 
                    placeholder='Product Name' 
                    required
                    id="" 
                    value={name}
                   onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                      <AttachMoneyIcon/>
                      <input 
                      placeholder='Price'
                      type="number"
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                       />

                </div>
                <div>
                      <DescriptionIcon/>
                      <textarea 
                      placeholder='Description'
                      type="text"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                       ></textarea>
            </div>
                       <div>
                            <AccountTreeIcon/>
                            <select value={category} onChange={(e)=>setCategory(e.target.value)}   >
                                <option value="">Choose Category</option>

                                {
                                    categories.map((category)=>(
                                        <option value={category} key={category}>{category}</option>
                                    ))
                                }



                            </select>
                       </div>
                       <div>
                        <StoreIcon/>
                        <input 
                        type="number"
                         placeholder='stock'
                         required
                         value={stock}
                         onChange={(e)=>setStock(e.target.value)}
                          id="" />
                       </div>
                       <div id='createProductFormFile'>
                        <input type="file" name="images" accept='image/*' multiple 
                        onChange={updateProductImagesChange}
                        />
                       </div>

                          <div id='createProductFormImage'>
                            {
                             oldImages && oldImages.map((image,index)=>(
                                    <img src={image.url} key={index} alt="Old product Preview" />
                                ))
                            }
                            {
                                imagesPreview.map((image,index)=>(
                                    <img src={image} key={index} alt="Product Preview" />
                                ))
                            }
              
                          </div>
                          <Button
                          id='createProductBtn'
                          type='submit'
                        
                          disabled={loading? true : false}
                          >Create</Button>
               




            </form>
        </div>
    </div>
   </Fragment>
  )
}

export default UpdateProduct;