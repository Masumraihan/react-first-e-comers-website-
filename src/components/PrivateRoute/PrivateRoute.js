//import React from 'react';
//import { useContext } from 'react';
//import { Route, Redirect } from "react-router-dom";
//import { userContext } from '../../App';

//const PrivateRoute = (children, ...rest) => {
//    const [loggedInUser,setLoggedInUser] = useContext(userContext);
//    return (
//        <div>
//            <Route
//                {...rest}
//                render={({ location }) =>
//                    loggedInUser ? (
//                        children
//                    ) : (
//                        <Redirect
//                            to={{
//                                pathname: "/login",
//                                state: { from: location }
//                            }}
//                        />
//                    )
//                }
//            />
//        </div>
//    );
//};

//export default PrivateRoute;