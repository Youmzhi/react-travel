import React, { useEffect  } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages'
import { Navigate } from 'react-router-dom';
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

// V5
// const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
//   const routeComponent = (props) => {
//     return isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to={{ pathname: "/signIn" }} />
//     ); 
//   }
//   return <Route render={routeComponent} {...rest} />;
// }

// V6
const PrivateRoute = ({ children }) => {
  const jwt = useSelector((s) => s.user.token);
  if (!jwt) {
    return <Navigate to='/signIn' replace />
  }

  return children
}


function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          {/* react-router-dom不支持ts, 安装ts类型声明文件 @types/react-router-dom */}
          <Route path='/' element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          <Route path='/search/:keyword' element={<SearchPage />} />
          {/* v5 */}
          {/* <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          /> */}
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/placeOrder"
            element={
              <PrivateRoute>
                <PlaceOrderPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<h1>404 not found 页面去火星了</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
