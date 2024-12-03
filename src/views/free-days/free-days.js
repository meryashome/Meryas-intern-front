import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../../components/Card'



const FreeDays = () => {
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
                                        <Form.Control type="date"  id="startDate" defaultValue="2019-12-18"/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="endDate">End Date</Form.Label>
                                        <Form.Control type="date"  id="endDate" defaultValue="2019-12-18"/>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label htmlFor="description">Description</Form.Label>
                                        <Form.Control as="textarea"  id="description" rows="5"/>
                                    </Form.Group>
                                    <Button type="button" variant="btn btn-primary">Submit</Button>{' '}
                                    <Button type="button" variant="btn btn-danger">cancel</Button>
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
