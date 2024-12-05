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

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const getAllTracking = async () => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    try {
      const response = await api.get(`/work-time/all-tracking`, {
        params: { startDate: today, endDate: today },
      });
      return response.data;
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
  useEffect(() => {
    getAllTracking()
    fetchUsersTodayBirth();
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
  const chart1 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: colors,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "total",
        data: [94, 80, 94, 80, 94, 80, 94],
      },
      {
        name: "pipline",
        data: [72, 60, 84, 60, 74, 60, 78],
      },
    ],
  };

  //chart2
  const chart2 = {
    options: {
      colors: colors,
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: false,
          },
        },
      },
      labels: ["Apples", "Oranges"],
    },
    series: [55, 75],
  };
  const chart3 = {
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "28%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["S", "M", "T", "W", "T", "F", "S", "M", "T", "W"],
        labels: {
          minHeight: 20,
          maxHeight: 20,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
    series: [
      {
        name: "Successful deals",
        data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35],
      },
      {
        name: "Failed deals",
        data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
      },
    ],
  };
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
                          $<CountUp start={120} end={560} duration={3} />K
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
                        <p className="mb-2">Total Profit</p>
                        <h4 className="counter">
                          $<CountUp start={20} end={158} duration={3} />K
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.primary}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={70}
                        id="circle-progress-03"
                      >
                        <svg className="" width="24" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Total Cost</p>
                        <h4 className="counter">
                          $<CountUp start={120} end={378} duration={3} />K
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
                    <h4 className="mb-2 card-title">Enterprise Clients</h4>
                    <p className="mb-0">
                      <svg
                        className="me-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#3a57e8"
                          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                      </svg>
                      15 new acquired this month
                    </p>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table
                      id="basic-table"
                      className="table mb-0 table-striped"
                      role="grid"
                    >
                      <thead>
                        <tr>
                          <th>COMPANIES</th>
                          <th>CONTACTS</th>
                          <th>ORDER</th>
                          <th>COMPLETION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes1}
                                alt="profile"
                              />
                              <h6>Addidis Sportwear</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$14,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>60%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={60}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes5}
                                alt="profile"
                              />
                              <h6>Netflixer Platforms</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$30,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>25%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={25}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes2}
                                alt="profile"
                              />
                              <h6>Shopifi Stores</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$8,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes3}
                                alt="profile"
                              />
                              <h6>Bootstrap Technologies</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$20,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes4}
                                alt="profile"
                              />
                              <h6>Community First</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$9,800</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>75%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={75}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
