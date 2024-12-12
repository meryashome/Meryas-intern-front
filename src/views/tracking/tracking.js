import api from "../../api/api";
import React, {useEffect, useState} from "react";
import {Form, FormGroup} from "react-bootstrap";

const Tracking = () => {
    const [trackedTime, setTrackedTime] = useState([])
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0])
    const getAllTracking = async () => {

        try {
            const response = await api.get(`/work-time/all-tracking`, {
                params: { startDate: filterDate, endDate: filterDate },
            });
            setTrackedTime(response.data[filterDate])
        } catch (error) {
            console.error("Error fetching tracking data:", error);
            throw error;
        }
    }
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilterDate(value)
    }
    useEffect(() => {
        getAllTracking()
    }, [filterDate]);
    return (
        <div className={'mt-5'}>
            <form>
                <Form.Group className="form-group">
                    <Form.Label>Date of tracking</Form.Label>
                    <Form.Control value={filterDate}
                                  onChange={handleDateChange} type="date" name={'Date'} id="Date" placeholder="Date of tracking"/>
                </Form.Group>

            </form>
            <div
                className="card"
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
        </div>
    )
}
export default Tracking
