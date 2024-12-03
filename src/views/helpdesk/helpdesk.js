import React, {useState} from 'react'
import {Row, Col, Form, Image} from 'react-bootstrap'
import Card from '../../components/Card'
import {Link} from 'react-router-dom'
// img
import imgsuccess from '../../assets/images/pages/img-success.png'
import api from "../../api/api";

const HelpDesk = () => {
    const [formData, setFormData] = useState({
        type: '',
        category: '',
        description: ''
    })
    const [show, AccountShow] = useState('type');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Convert to Date object if value exists
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('id');
        try {
            const response = await api.post(`/helpdesk/create/${userId}`, formData);
            if (response.data.status === "PENDING") {
                AccountShow('Image')
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Simple Wizard</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="form-wizard1" className="text-center mt-3">
                                    <ul id="top-tab-list" className="p-0 row list-inline">
                                        <li className={` ${show === 'Image' ? ' active done' : ''} ${show === 'description' ? ' active done' : ''} ${show === 'category' ? ' active done' : ''} ${show === 'type' ? 'active' : ''} col-lg-3 col-md-6 text-start mb-2 active`}
                                            id="type">
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg"
                                                         height="20" width="20" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                                                    </svg>
                                                </div>
                                                <span>Type</span>
                                            </Link>
                                        </li>
                                        <li id="category"
                                            className={`${show === 'description' ? ' active done' : ''} ${show === 'Image' ? ' active done' : ''} ${show === 'category' ? 'active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                    </svg>
                                                </div>
                                                <span>Category</span>
                                            </Link>
                                        </li>
                                        <li id="description"
                                            className={`${show === 'Image' ? ' active done' : ''} ${show === 'description' ? 'active' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    </svg>
                                                </div>
                                                <span>Description</span>
                                            </Link>
                                        </li>
                                        <li id="confirm"
                                            className={`${show === 'Image' ? ' active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2" d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                </div>
                                                <span>Finish</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <fieldset className={`${show === 'type' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Request Type: </h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Step 1 - 3</h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Type:</label>
                                                        <select value={formData.type}
                                                                onChange={handleChange} name="type" className="selectpicker form-control" data-style="py-0">
                                                            <option>IT</option>
                                                            <option>HR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" name="next"
                                                className="btn btn-primary next action-button float-end" value="Next"
                                                onClick={() => AccountShow('category')}>Next
                                        </button>
                                    </fieldset>
                                    <fieldset className={`${show === 'category' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Request Category:</h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Step 2 - 3</h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Category: *</label>
                                                        <input value={formData.category} onChange={handleChange} type="text" className="form-control" name="category"
                                                               placeholder="Category"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" name="next"
                                                className="btn btn-primary next action-button float-end" value="Next"
                                                onClick={() => AccountShow('description')}>Next
                                        </button>
                                        <button type="button" name="previous"
                                                className="btn btn-dark previous action-button-previous float-end me-1"
                                                value="Previous" onClick={() => AccountShow('type')}>Previous
                                        </button>
                                    </fieldset>
                                    <fieldset className={`${show === 'description' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Request Description:</h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Step 3 - 3</h2>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Description:</label>
                                                <textarea onChange={handleChange} value={formData.description} className="form-control" name="description" placeholder="Description" />
                                            </div>
                                        </div>
                                        <button type="button" name="next"
                                                className="btn btn-primary next action-button float-end" value="Submit"
                                                onClick={handleSubmit}>Submit
                                        </button>
                                        <button type="button" name="previous"
                                                className="btn btn-dark previous action-button-previous float-end me-1"
                                                value="Previous" onClick={() => AccountShow('category')}>Previous
                                        </button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card">
                                            <h2 className="text-success text-center"><strong>SUCCESS !</strong></h2>
                                            <br/>
                                            <div className="row justify-content-center">
                                                <div className="col-3"><Image src={imgsuccess} className="img-fluid"
                                                                              alt="fit-image"/></div>
                                            </div>
                                            <br/><br/>
                                            <div className="row justify-content-center">
                                                <div className="col-7 text-center">
                                                    <h5 className="purple-text text-center">Request Created Successfully</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default HelpDesk
