import { useEffect, memo, Fragment, useContext } from "react";
import {useLocation, Outlet, Navigate} from "react-router-dom";

//react-shepherd
import {  ShepherdTourContext } from "react-shepherd";

//react-bootstrap
import { Button } from "react-bootstrap";

// header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//subheader
import SubHeader from "../../components/partials/dashboard/HeaderStyle/sub-header";

//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";

//footer
import Footer from "../../components/partials/dashboard/FooterStyle/footer";

import Loader from "../../components/Loader";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';


const Default = memo((props) => {
  // let location = useLocation();
  // const pageLayout = useSelector(SettingSelector.page_layout);
    const token = localStorage.getItem('accessToken');
    let isAuthenticated = false;

    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            const isExpired = decodedToken.exp < Date.now() / 1000; // Token expiration check
            if (!isExpired) {
                isAuthenticated = true;
            }
        } catch (e) {
            console.log('Error decoding token');
        }
    }
  const appName = useSelector(SettingSelector.app_name);
  useEffect(() => {});

  return (
      isAuthenticated ? (
          <Fragment>
              <Loader />
              <Sidebar app_name={appName} />
              <main className="main-content">
                  <div className="position-relative">
                      <Header />
                      <SubHeader />
                  </div>
                  <div className="py-0 conatiner-fluid content-inner mt-n5">
                      {/* <DefaultRouter /> */}
                      <Outlet />
                  </div>
                  <Footer />
              </main>
          </Fragment>
      ) : (
          <Navigate to="/auth" replace/> // Redirect to login page if not authenticated
          )
  );
});

Default.displayName = "Default";
export default Default;
