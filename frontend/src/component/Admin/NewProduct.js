import React, { Fragment, useEffect } from 'react'
import MetaData from '../MetaData'
import "./NewProduct.css"
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StoreIcon from '@mui/icons-material/Store';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const NewProduct = () => {
    const navigate=useNavigate()
const dispatch=useDispatch()
const {loading,error,success}=useSelector(state=>state.newProduct)
const [name,setName]=useState("")
const [price,setPrice]=useState(0)
const [description,setDescription]=useState("")
const [category,setCategory]=useState("")
const [stock,setStock]=useState(0)

const [images,setImages]=useState([])
const [imagesPreview,setImagesPreview]=useState([])

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Clothing",
        "Camera",
        "SmartPhones",
        "Shoes",
        "Electronics",
        "Clothing"
      ];





const createProductSubmitHandler=(e)=>{
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

   dispatch(createProduct(myForm))


}

const createProductImagesChange=(e)=>{
    const files=Array.from(e.target.files)

   setImages([])
    setImagesPreview([])

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
  
    if(error){
        toast.error(error)
        dispatch(clearErrors())
    }
    
    if(success){
        toast.success("Product Created Successfully")
        
        navigate("/admin/dashboard")
        dispatch({type:NEW_PRODUCT_RESET}) 
    }
    
    
    }, [dispatch,error,navigate,success])
  return (
   <Fragment>

    <MetaData title="Create Product"/>
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form action="" 
            onSubmit={createProductSubmitHandler}
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
                            <select onChange={(e)=>setCategory(e.target.value)}   >
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
                        <input type="file" name="avatar" accept='image/*' multiple 
                        onChange={createProductImagesChange}
                        />
                       </div>

                          <div id='createProductFormImage'>
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

export default NewProduct