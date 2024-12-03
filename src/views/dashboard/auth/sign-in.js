import React, {useState} from 'react'
import { Row, Col, Image, Form, Button, ListGroup, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'
import logoImg from  '../../../assets/images/LOGO.png'

// img
import facebook from '../../../assets/images/brands/fb.svg'
import google from '../../../assets/images/brands/gm.svg'
import instagram from '../../../assets/images/brands/im.svg'
import linkedin from '../../../assets/images/brands/li.svg'
import auth1 from '../../../assets/images/auth/01.png'
import api from "../../../api/api";
import jwt_decode from "jwt-decode";

const SignIn = () => {
   let history = useNavigate()
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const token = localStorage.getItem('accessToken');

   if (token) {
      try {
         const decodedToken = jwt_decode(token);
         const isExpired = decodedToken.exp < Date.now() / 1000; // Token expiration check
         if (!isExpired) {
            window.location.href = '/'
         }
      } catch (e) {
         console.log('Error decoding token');
      }
   }
   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await api.post('/auth/sign-in', { email, password });
         const { token,role,user } = response.data; // Assume accessToken is returned
         localStorage.setItem('accessToken', token); // Store token in localStorage
         localStorage.setItem('role', role);
         localStorage.setItem('id', user.id);
         // Redirect to protected route or home page
         window.location.href = '/'; // Example: Navigate to home page
      } catch (error) {
         setError('Invalid credentials');
      }
   };
   return (
      <>
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                           <Card.Body>
                              <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3 justify-content-center">
                                 <img className={'logoSignIn'} src={logoImg} alt=""/>
                              </Link>
                              <h2 className="mb-2 text-center">Sign In</h2>
                              <p className="text-center">Login to stay connected.</p>
                              <Form>
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <Form.Control type="email"
                                                        className=""
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required id="email"
                                                        aria-describedby="email"
                                                        placeholder=" " />
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password"
                                                        className=""
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required id="password"
                                                        aria-describedby="password"
                                                        placeholder=" " />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3">
                                          <Form.Check.Input type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button onClick={handleLogin} type="button" variant="btn btn-primary">Sign In</Button>
                                 </div>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  <div className="sign-bg">
                     <img className={'logoBg'} src={logoImg} alt=""/>
                  </div>
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            </Row>
         </section>
      </>
   )
}

export default SignIn
