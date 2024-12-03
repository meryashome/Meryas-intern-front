import React, {useState} from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import Card from '../../../components/Card'

import {Link} from 'react-router-dom'
// img
import avatars1 from '../../../assets/images/avatars/01.png'
import avatars2 from '../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../assets/images/avatars/avtar_5.png'
import axios from "axios";
import api from "../../../api/api";

const UserAdd =() =>{
   const [formData, setFormData] = useState({
      nationalId: '',
      name: '',
      familyName: '',
      birthDate: '',
      email: '',
      password: '',
      avatar: null, // File or string, depending on your implementation
      jobTitle: '',
      role: 'Employee', // Default role
      jobStartDate: '',
      managerId: null, // Optional field
      phoneNumber: '', // Optional field
      freeDays: 2, // Required field, initialized to 0
      extraDays: null, // Optional field
      cityOrTown: '', // Optional field
      country: '', // Optional field
   });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
      const day = d.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
      return `${year}-${month}-${day}`;
   };
   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "birthDate" || name === "jobStartDate") {
         // Convert the value to a Date object if it's a valid date string
         setFormData({
            ...formData,
            [name]: value ? formatDate(value) : "", // Convert to Date object if value exists
         });
      } else {
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      const formattedFormData = {
         ...formData,
         birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : "",
         jobStartDate: formData.jobStartDate ? new Date(formData.jobStartDate).toISOString() : "",
      };

      try {
         const response = await api.post('/user/add', formattedFormData);
         // Assuming a success message is returned or status 201
         console.log('User created:', response.data);
         alert('User created successfully!');
      } catch (err) {
         console.error(err);
         setError('Error creating user. Please try again.');
      } finally {
         setLoading(false);
      }
   };
  return(
      <>
        <div>
            <Row>
               <Col xl="3" lg="4" className="">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Add New User</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <Form>
                           <Form.Group className="form-group">
                              <div className="profile-img-edit position-relative">
                                 <Image className="theme-color-default-img  profile-pic rounded avatar-100" src={avatars1} alt="profile-pic"/>
                                 <div className="upload-icone bg-primary">
                                    <svg className="upload-button" width="14" height="14" viewBox="0 0 24 24">
                                       <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                    </svg>
                                    <Form.Control className="file-upload" type="file" accept="image/*"/>
                                 </div>
                              </div>
                              <div className="img-extension mt-3">
                                 <div className="d-inline-block align-items-center">
                                    <span>Only</span>{' '}
                                    <Link to="#">.jpg</Link>{' '}
                                    <Link to="#">.png</Link>{' '}
                                    <Link to="#">.jpeg</Link>{' '}
                                    <span>allowed</span>
                                 </div>
                              </div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>User Job Title:</Form.Label>
                              <select value={formData.jobTitle}
                                      onChange={handleChange} name="jobTitle" className="selectpicker form-control" data-style="py-0">
                                 <option>Select</option>
                                 <option>Web Designer</option>
                                 <option>Web Developer</option>
                                 <option>Tester</option>
                                 <option>Architect</option>
                                 <option>IT</option>
                                 <option>HR</option>
                              </select>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>User Role:</Form.Label>
                              <select value={formData.role}
                                      onChange={handleChange} name="role" className="selectpicker form-control" data-style="py-0">
                                 <option>Select</option>
                                 <option>ADMIN</option>
                                 <option>MANAGER</option>
                                 <option>EMPLOYEE</option>
                              </select>
                           </Form.Group>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xl="9" lg="8">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">New User Information</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                           <form>
                              <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label  htmlFor="fname">First Name:</Form.Label>
                                    <Form.Control value={formData.name || ''}
                                                  onChange={handleChange} type="text" name={'name'} id="fname" placeholder="First Name"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="lname">Last Name:</Form.Label>
                                    <Form.Control value={formData.familyName}
                                                  onChange={handleChange} type="text" name={'familyName'} id="lname" placeholder="Last Name"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="nationalId">National Id:</Form.Label>
                                    <Form.Control value={formData.nationalId}
                                                  onChange={handleChange} type="text" name={'nationalId'} id="nationalId" placeholder="National Id"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="city">Town/City:</Form.Label>
                                    <Form.Control value={formData.cityOrTown}
                                                  onChange={handleChange} type="text" name={'cityOrTown'} id="city" placeholder="Town/City"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="mobno">Mobile Number:</Form.Label>
                                    <Form.Control value={formData.phoneNumber}
                                                  onChange={handleChange} type="text" name={'phoneNumber'} id="mobno" placeholder="Mobile Number"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                    <Form.Control value={formData.email}
                                                  onChange={handleChange} type="email" name={'email'} id="email" placeholder="Email"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="jobStartDate">Job Start Date:</Form.Label>
                                    <Form.Control value={formData.jobStartDate}
                                                  onChange={handleChange} type="date" name={'jobStartDate'} id="jobStartDate" placeholder="Job Start Date"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="birthDate">Birth Date:</Form.Label>
                                    <Form.Control value={formData.birthDate}
                                                  onChange={handleChange} type="date" name={'birthDate'} id="birthDate" placeholder="Birth Date"/>
                                 </Form.Group>
                              </div>
                              <hr/>
                              <h5 className="mb-3">Security</h5>
                              <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="pass">Password:</Form.Label>
                                    <Form.Control type="password"  id="pass" placeholder="Password"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="rpass">Repeat Password:</Form.Label>
                                    <Form.Control value={formData.password}
                                                  onChange={handleChange} type="password" name={'password'} id="rpass" placeholder="Repeat Password "/>
                                 </Form.Group>
                              </div>
                              <div className="checkbox">
                                 <label className="form-label"><input type="checkbox" className="me-2 form-check-input"  value="" id="flexCheckChecked"/>Enable Two-Factor-Authentication</label>
                              </div>
                              <Button onClick={handleSubmit} type="button" variant="btn btn-primary">Add New User</Button>
                           </form>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      </>
  )

}

export default UserAdd;
