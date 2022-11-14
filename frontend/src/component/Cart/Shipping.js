import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import { Country, State }  from 'country-state-city';
import "./Shipping.css"
import MetaData from '../MetaData';
import CheckoutSteps from './CheckoutSteps';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';



const Shipping = () => {
const dispatch=useDispatch()
 const navigate=useNavigate()   
const {shippingInfo}=useSelector(state=>state.cart)
const [address, setAddress] = useState(shippingInfo.address)
const [city, setCity] = useState(shippingInfo.city)
const [state, setState] = useState(shippingInfo.state)
const [country, setCountry] = useState(shippingInfo.country)
 const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)



const shippingSubmit=(e)=>{
e.preventDefault()
if(!address || !city || !Country || !pinCode || !phoneNo){
  return toast.error("Fill All Fields")
}
         if(phoneNo.length<10 || phoneNo.length >10){
            return toast.error("Phone Number Should Be 10 Digit Long")
    
          }
          if(state=== undefined){
            return toast.error("Fill State")
          }

dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))
navigate("/order/confirm")
}




  return (
    <Fragment>
        <MetaData  title="Shipping Details"/>
        <div className="checkOut">

        <CheckoutSteps  activeStep={0}   />
        </div>
        <div className="shippingContainer">
            <div className="shippingBox">
                <h1 className='shippingHeading' >Shipping Details</h1>
                <form className='shippingForm' onSubmit={shippingSubmit} >
                    <div>
                        <HomeIcon/>
                        <input 
                        // required
                        type="text"
                         name="address"
                        id=""
                        placeholder='Address'
                        value={address} 
                        onChange={(e)=>setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <HomeIcon/>
                        <input 
                        // required
                        type="text"
                    placeholder='City'
                        id=""
                        value={city} 
                        onChange={(e)=>setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <HomeIcon/>
                        <input 
                        // required
                        type="number"
                    placeholder='PinCode'
                        id=""
                        value={pinCode} 
                        onChange={(e)=>setPinCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <HomeIcon/>
                        <input 
                        // required
                        type="number"
                        placeholder='PhoneNo'
                        id=""
                        value={phoneNo} 
                        onChange={(e)=>setPhoneNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <HomeIcon/>
                       <select 
                    //    required
                        id=""
                        placeholder='Country'
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        
                        >
                        <option value="">Country</option>
                        {
                            Country && Country.getAllCountries().map((country)=>(
                                <option value={country.isoCode} key={country.isoCode}  >
                                    {country.name}
                                </option>
                            ))
                        }
                    



                        </select>
                    </div>
                    {
                        country && (
                            <div>
                                <HomeIcon/>
                                <select 
                                 id=""
                                 value={state}
                                 onChange={(e)=>setState(e.target.value)}
                                 
                                 >
                                       <option value="">State</option>
                                    {
                                        State && State.getStatesOfCountry(country).map((state)=>(
                                            <option value={state.isoCode} key={state.isoCode} >{state.name}</option>
                                        ))
                                    }

                                 </select>
                            </div>
                        )
                     }

                     <input type="submit" value="Continue"
                     className='shippingBtn'
                    //  disabled={state? false:true}
                     
                     id="" />

                   

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping