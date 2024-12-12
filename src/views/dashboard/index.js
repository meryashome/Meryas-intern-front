import React, {useEffect, memo, Fragment, useState} from "react";
import {Row, Col, Dropdown, Button, Card, Image} from "react-bootstrap";
import { Link } from "react-router-dom";

//circular
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../components/progress.js";
//img
import shapes1 from "../../assets/images/shapes/01.png";
import shapes2 from "../../assets/images/shapes/02.png";
import shapes3 from "../../assets/images/shapes/03.png";
import shapes4 from "../../assets/images/shapes/04.png";
import shapes5 from "../../assets/images/shapes/05.png";

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import avatars11 from "../../assets/images/avatars/01.png";
import api from "../../api/api";
import offset from "aos/src/js/libs/offset";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [trackedTime, setTrackedTime] = useState([])
  const [freeDaysRequests, setFreeDaysRequests] = useState([])
  const [loading, setLoading] = useState(true);
  const getAllTracking = async () => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    try {
      const response = await api.get(`/work-time/all-tracking`, {
        params: { startDate: today, endDate: today },
      });
      console.log(response.data[today]);
      setTrackedTime(response.data[today])
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      throw error;
    }
  }
    const fetchUsersTodayBirth = async () => {
      try {
        const response = await api.get('/user/todayBirthDay');
        setUsers(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
  const fetchFreeDaysRequests = async () => {
      try {
        const response = await api.get('/freedays/requests');
        setFreeDaysRequests(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
  const updateFreeDaysRequestsStatus = async (reqId, actionStatus) => {
      try {
        const response = await api.put(`/freedays/update-status/${reqId}`,{status: actionStatus});
        console.log('User created:', response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
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
  const handleAction = (reqId, actionStatus) => {
    updateFreeDaysRequestsStatus(reqId, actionStatus)
  }
  useEffect(() => {
    fetchProfile();
    getAllTracking()
    fetchUsersTodayBirth();
    fetchFreeDaysRequests();
  }, []);
  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [variableColors.primary, variableColors.info];
  useEffect(() => {
    return () => colors;
  });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });
  return (
    <Fragment>
      <Row>
        <Col md="12" lg="12">
          <Row className="row-cols-1">
            <div className="overflow-hidden d-slider1 " data-aos="fade-up" data-aos-delay="800">
              <Swiper
                className="p-0 m-0 mb-2 list-inline "
                slidesPerView={5}
                spaceBetween={32}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 3 },
                  1500: { slidesPerView: 4 },
                  1920: { slidesPerView: 4 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 }
                }}

              >
                <SwiperSlide className="card card-slide" >
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.primary}
                        width="60px"
                        height="60px"
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        style={{ width: 60, height: 60 }}
                        value={90}
                        id="circle-progress-01"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Solde Congé</p>
                        <h4 className="counter">
                          <CountUp start={0} end={user?.freeDays} duration={1} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.info}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={60}
                        id="circle-progress-02"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Extra Days</p>
                        <h4 className="counter">
                          <CountUp start={0} end={user?.extraDays} duration={1} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            </div>
          </Row>
        </Col>
        <Col md="12" lg="8">
          <Row>
            <Col md="12" lg="12">
              <div
                className="overflow-hidden card"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Tracked Time</h4>
                  </div>
                </div>
                <div className="p-0 card-body">
                  {(trackedTime === null || trackedTime === undefined) ? (
                      <div className={'p-4'}>no one tracked in this day</div>
                  ) : (
                      <div className="mt-4 table-responsive">
                        <table
                            id="basic-table"
                            className="table mb-0 table-striped"
                            role="grid"
                        >
                          <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Tracked</th>
                            <th>Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          {trackedTime.map((item,index) => {
                            return (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <h6>{item?.userName}</h6>
                                    </div>
                                  </td>
                                  <td className={'p-0'}>
                                    <table className="table mb-0 table-bordered"
                                           role="grid">
                                      <tbody>
                                      <tr>
                                        {item.events.map((event,eventIndex) => {
                                          return (
                                              <td className={eventIndex}><h6>{event.eventTime.toString().split("T")[1].substring(0,5)}</h6></td>
                                          )
                                        })}
                                      </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>{item?.events[item?.events.length - 1].eventType === 'stop' ? 'Pause' : 'Working'}</td>
                                </tr>
                            )
                          })}
                          </tbody>
                        </table>
                      </div>
                  )}
                </div>
              </div>
            </Col>
            <Col md="12" lg="12">
              <div
                className="overflow-hidden card"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Free days Requests</h4>
                  </div>
                </div>
                <div className="p-0 card-body">
                  {(freeDaysRequests.length === 0) ? (
                      <div className={'p-4'}>no free days requests pending</div>
                  ) : (
                      <div className="mt-4 table-responsive">
                        <table
                            id="basic-table"
                            className="table mb-0 table-striped"
                            role="grid"
                        >
                          <thead>
                          <tr>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Description</th>
                            <th>Actions</th>
                          </tr>
                          </thead>
                          <tbody>
                          {freeDaysRequests.map((item,index) => {
                            return (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <h6>{item?.startDate}</h6>
                                    </div>
                                  </td>
                                  <td>
                                    <h6>{item?.endDate}</h6>
                                  </td>
                                  <td>
                                    <h6>{item?.description}</h6>
                                  </td>
                                  <td>
                                    <div className={'d-flex gap-2'}>
                                      <Button type="button" variant="btn btn-primary" onClick={()=>{handleAction(item.id,'APPROVED')}}>Accept</Button>
                                      <Button type="button" variant="btn btn-danger" onClick={() => {handleAction(item.id, 'DECLINED')}}>Decline</Button>
                                    </div>
                                  </td>
                                </tr>
                            )
                          })}
                          </tbody>
                        </table>
                      </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md="12" lg="4">
          <Row>
            {!loading && (
                <Col md="12" lg="12">
                  <Card>
                    <Card.Body>
                      {(users?.length === 0) ? (
                          <div>No one born in this day</div>
                      ) : (
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="d-flex flex-column text-center align-items-center justify-content-between ">
                              <div className="fs-italic">
                                <h5 className={'text-capitalize'}>{users[0]?.name} {users[0]?.familyName}</h5>
                                <div className="text-black-50 mb-1">
                                  <small>{users[0]?.jobTitle}</small>
                                </div>
                              </div>
                              <div className="card-profile-progress">
                                <Circularprogressbar  stroke={props.colorprimarymode} Linecap='rounded' trailstroke='#ddd' strokewidth="4px" width="100" height="100" value={60} style={{width:'140px', height:'140px',}}>
                                  <Image className="theme-color-default-img  img-fluid rounded-circle card-img" src={avatars11} alt="profile-pic"/>
                                </Circularprogressbar>
                              </div>
                            </div>
                          </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
            )}
            {/*<Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="600">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Activity overview</h4>
                    <p className="mb-0">
                      <svg
                        className="me-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#17904b"
                          d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                        />
                      </svg>
                      16% this month
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">$2400, Purchase</h6>
                      <span className="mb-0">11 JUL 8:10 PM</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">New order #8744152</h6>
                      <span className="mb-0">11 JUL 11 PM</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">Affiliate Payout</h6>
                      <span className="mb-0">11 JUL 7:64 PM</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">New user added</h6>
                      <span className="mb-0">11 JUL 1:21 AM</span>
                    </div>
                  </div>
                  <div className="mb-1 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">Product added</h6>
                      <span className="mb-0">11 JUL 4:50 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>*/}
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
})

export default Index
