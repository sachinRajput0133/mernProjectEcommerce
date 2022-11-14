import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children ,isAdmin}) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);


    if(loading===false && !isAuthenticated){
      return <Navigate to={"/login"} />
    }
    if(isAdmin===true && user.role=="user" ){
      return <Navigate to={"/login"} />
    }

         
  return children;
};

export default ProtectedRoute;









   {/* {
      
      loading === false &&  !isAuthenticated  ? <Navigate to="/login" /> :children 
    
       }  */}


























// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {!loading && (
//         <Route
//           {...rest}
//           render={(props) => {
//              if(!isAuthenticated){
//                 return <Navigate to="/login" />
//              }
           

//             return <Element {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;
