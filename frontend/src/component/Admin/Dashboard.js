import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import "./Sidebar.js"
import { Line } from 'react-chartjs-2';
import Sidebar from './Sidebar.js'
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
  } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );


const Dashboard = () => {
  const { error, products }=useSelector(state=>state.products )
  const { orders }=useSelector(state=>state.allOrders )
  const {  users }=useSelector(state=>state.allusers )
  const dispatch=useDispatch()

let outOfStock=0;

products && products.forEach((product)=>{
  if(product.stock ===0){
    outOfStock +=1
  }
})



let totalAmount=0;
orders && orders.forEach((order)=> totalAmount += Number(order.totalPrice))





const lineData={
    labels:["Initial Amount" ,"Amount Earned"],
    datasets:[
        {
            label:"TOTAL AMOUNT",
            data:[0,totalAmount],
            backgroundColor:["tomato"],
            hoverBackgroundColor:["rgba(197,72,49)"]
        }
    ]
}

 const options = {
    // responsive: true,
    
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };



const donutData={
    labels:["Out Of Stock","In Stock"],
    datasets:[
        {
            data:[outOfStock,products.length - outOfStock],
            backgroundColor:["#00A684","#680004"],
            hoverBackgroundColor:["#485000","#35014F"]
        }
    ]
}


useEffect (() => {
 
  
  
  dispatch(getAdminProducts())
  dispatch(getAllOrders())
  dispatch(getAllUsers())
  
  }, [dispatch,error])
  return (
       <div className="dashboard">
        <Sidebar/>
        <div className="dashboardContainer">
           <Typography component="h1" >Dashboard</Typography>
           <div className="dashboardSummary">
             <div  className="dashboardSummarBox1">
                <p>Total Amount <br />₹{totalAmount}</p>
            </div>
          
           <div className="dashboardSummarBox2">
            <Link to="/admin/products" >
                <p>Product</p>
                <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" >
                <p>Orders</p>
                <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users" >
                <p>Users</p>
                <p>{ users && users.length}</p>
            </Link>
           </div>
           </div>

           <div className="lineChart">
            <Line data={lineData} options={options} />
           </div>
           <div className="donutChart">
            
           <Doughnut data={donutData}>

           </Doughnut>
           </div>
           
        </div>
       </div>
  )
}

export default Dashboard