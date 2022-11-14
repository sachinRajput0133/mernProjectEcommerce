import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./CheckoutSteps.css"
const CheckoutSteps = ({activeStep}) => {
const steps=[
    {
        label:<Typography>Shipping Details</Typography>,
        icon:<LocalShippingIcon/>
    },
    {
        label:<Typography>Confirm Order</Typography>,
        icon:<LibraryAddCheckIcon/>
    },
    {
        label:<Typography>Payment</Typography>,
        icon:<AccountBalanceIcon/>
    },
]

const stepStyle={
    boxSizing:"borderBox"
}

    
  return (
    <Fragment>
       <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}  >
        {
           steps.map((s,i)=>(
            <Step  key={i} 
            //  completed={activeStep>=i?true:false} 
            //   active={activeStep === i ? true : false} 
               >
                <StepLabel style={{color:activeStep>=i ?"tomato" : "rgba(0,0,0,0.649)"}}  icon={s.icon} >{s.label}</StepLabel>
            </Step>


           ))
        }
        
       </Stepper>

    </Fragment>
  )
}

export default CheckoutSteps