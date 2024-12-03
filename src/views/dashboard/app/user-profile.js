import React, {Fragment, useEffect, useState} from 'react'
import FsLightbox from 'fslightbox-react';

import {Row,Col,Image,Form,Nav,Dropdown,Tab} from 'react-bootstrap'
import Card from '../../../components/Card'

import {Link} from 'react-router-dom'
// img

import avatars11 from '../../../assets/images/avatars/01.png'
import avatars22 from '../../../assets/images/avatars/avtar_1.png'
import avatars33 from '../../../assets/images/avatars/avtar_2.png'
import avatars44 from '../../../assets/images/avatars/avtar_3.png'
import avatars55 from '../../../assets/images/avatars/avtar_4.png'
import avatars66 from '../../../assets/images/avatars/avtar_5.png'
import avatars2 from '../../../assets/images/avatars/02.png'
import avatars3 from '../../../assets/images/avatars/03.png'
import avatars4 from '../../../assets/images/avatars/04.png'
import avatars5 from '../../../assets/images/avatars/05.png'


import icon1 from '../../../assets/images/icons/01.png'
import icon2 from '../../../assets/images/icons/02.png'
import icon3 from '../../../assets/images/icons/03.png'
import icon4 from '../../../assets/images/icons/04.png'
import icon8 from '../../../assets/images/icons/08.png'
import icon6 from '../../../assets/images/icons/06.png'
import icon7 from '../../../assets/images/icons/07.png'

import icon5 from '../../../assets/images/icons/05.png'
import shap2 from '../../../assets/images/shapes/02.png'
import shap4 from '../../../assets/images/shapes/04.png'
import shap6 from '../../../assets/images/shapes/06.png'
import pages2 from '../../../assets/images/pages/02-page.png'

import ShareOffcanvas from '../../../components/partials/components/shareoffcanvas'
import api from "../../../api/api";

const UserProfile =() =>{
   const [toggler, setToggler] = useState();
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const id= localStorage.getItem('id')
            const response = await api.get(`/user/${id}`); // Example protected route
            setUser(response.data);
         } catch (error) {
            console.log('Error fetching profile:', error);
         } finally {
            setLoading(false);
         }
      };
      fetchProfile();
   }, []);
  return(
      <Fragment>
         <FsLightbox
                  toggler={ toggler }
                  sources={ [icon4,shap2,icon8,shap4,icon2,shap6,icon5,shap4,icon1] }
               />
         <Row>
            <Col lg="12">
               <Card>
                  <Card.Body>
                     <div className="text-center">
                        <div className="user-profile">
                           <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src={avatars11} alt="profile-pic"/>
                           <Image className="theme-color-purple-img rounded-pill avatar-130 img-fluid" src={avatars22} alt="profile-pic"/>
                           <Image className="theme-color-blue-img rounded-pill avatar-130 img-fluid" src={avatars33} alt="profile-pic"/>
                           <Image className="theme-color-green-img rounded-pill avatar-130 img-fluid" src={avatars55} alt="profile-pic"/>
                           <Image className="theme-color-yellow-img rounded-pill avatar-130 img-fluid" src={avatars66} alt="profile-pic"/>
                           <Image className="theme-color-pink-img rounded-pill avatar-130 img-fluid" src={avatars44} alt="profile-pic"/>
                        </div>
                        <div className="mt-3">
                           <h3 className="d-inline-block text-capitalize">{user?.name} {user?.familyName}</h3>
                           <br/>
                           <p className="d-inline-block pl-3">{user?.jobTitle}</p>
                        </div>
                     </div>
                  </Card.Body>
               </Card>
               <Card>
                  <Card.Header>
                     <div className="header-title">
                        <h4 className="card-title">About User</h4>
                     </div>
                  </Card.Header>
                  <Card.Body>
                     <div className="user-bio">
                        <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.</p>
                     </div>
                     <div className="mt-2">
                        <h6 className="mb-1">Joined:</h6>
                        <p>Feb 15, 2021</p>
                     </div>
                     <div className="mt-2">
                        <h6 className="mb-1">Lives:</h6>
                        <p>United States of America</p>
                     </div>
                     <div className="mt-2">
                        <h6 className="mb-1">Email:</h6>
                        <p><Link to="#" className="text-body"> austin@gmail.com</Link></p>
                     </div>
                     <div className="mt-2">
                        <h6 className="mb-1">Url:</h6>
                        <p><Link to="#" className="text-body" target="_blank"> www.bootstrap.com </Link></p>
                     </div>
                     <div className="mt-2">
                        <h6 className="mb-1">Contact:</h6>
                        <p><Link to="#" className="text-body">(001) 4544 565 456</Link></p>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Fragment>
  )

}

export default UserProfile;
