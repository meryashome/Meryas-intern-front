import {useState, memo, Fragment, useEffect} from 'react'
import {Row,Col,Image,Form,Button,InputGroup,FormControl} from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

// import {bindActionCreators} from "redux"

import {Link} from 'react-router-dom'
// img
import shap2 from '../../assets/images/shapes/02.png'
import shap4 from '../../assets/images/shapes/04.png'
import shap6 from '../../assets/images/shapes/06.png'

import icon1 from '../../assets/images/icons/01.png'
import icon2 from '../../assets/images/icons/02.png'
import icon4 from '../../assets/images/icons/04.png'
import icon5 from '../../assets/images/icons/05.png'

import icon8 from '../../assets/images/icons/08.png'

import avatars11 from '../../assets/images/avatars/01.png'
// Circularprogressbar
import Circularprogressbar from '../../components/circularprogressbar'
import api from "../../api/api";

const StuffDirectory = memo((props) => {
    const [toggler, setToggler] = useState(false);
        const [users, setUsers] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await api.get('/user'); // Example protected route
                    setUsers(response.data);
                } catch (error) {
                    console.log('Error fetching profile:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        }, []);
    return (
        <Fragment>
          <FsLightbox
                toggler={ toggler }
                sources={ [icon4,shap2,icon8,shap4,icon2,shap6,icon5,shap4,icon1] }
            />
            <Row>
                {users?.length !== 0 && users?.map((user) => {
                    return (
                        <Col lg="4">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="d-flex flex-column text-center align-items-center justify-content-between ">
                                            <div className="fs-italic">
                                                <h5 className={'text-capitalize'}>{user.name} {user.familyName}</h5>
                                                <div className="text-black-50 mb-1">
                                                    <small>{user.jobTitle}</small>
                                                </div>
                                            </div>
                                            <div className="card-profile-progress">
                                                <Circularprogressbar  stroke={props.colorprimarymode} Linecap='rounded' trailstroke='#ddd' strokewidth="4px" width="100" height="100" value={60} style={{width:'140px', height:'140px',}}>
                                                    <Image className="theme-color-default-img  img-fluid rounded-circle card-img" src={avatars11} alt="profile-pic"/>
                                                </Circularprogressbar>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Fragment>
    )
}
)

StuffDirectory.displayName="StuffDirectory"
export default StuffDirectory
