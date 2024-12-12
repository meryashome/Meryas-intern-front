import React, {useState} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../../components/Card'
import api from "../../api/api";



const FreeDays = () => {

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        description: ''
    })
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
            const response = await api.post(`/freedays/create/${userId}`, formData);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <div>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Free Days Request</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="startDate">Start Date</Form.Label>
                                        <Form.Control type="date" value={formData.startDate} onChange={handleChange} name="startDate" id="startDate" defaultValue={new Date()}/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="endDate">End Date</Form.Label>
                                        <Form.Control type="date" value={formData.endDate} onChange={handleChange} name="endDate" id="endDate" defaultValue="2019-12-18"/>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label htmlFor="description">Description</Form.Label>
                                        <Form.Control as="textarea" value={formData.description} onChange={handleChange} name="description" id="description" rows="5"/>
                                    </Form.Group>
                                    <Button type="button" variant="btn btn-primary" onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default FreeDays
