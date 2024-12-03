import React, {useEffect, useState} from 'react';
import {useStopwatch} from 'react-timer-hook';
import api from "../api/api";

function TrackingComponent() {
    let {
        totalSeconds,
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastEvent, setLastEvent] = useState(null);

    const userId = parseInt(localStorage.getItem('id'));

    const toGMTPlus1 = (utcDate) => {
        const date = new Date(utcDate); // Ensure the input is treated as UTC
        const offset = 1; // GMT+1 offset (no DST)
         // Add 1 hour in milliseconds
        return new Date(date.getTime() + offset * 60 * 60 * 1000);
    };

    const fetchLastEvent = async () => {
        try {
            setLoading(true);
            setError('');

            // Get today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split('T')[0];

            // Include the day as a query parameter
            const lestEventResponse = await api.get(`/work-time/${userId}/last-event?day=${today}`);
            const summaryResponse = await api.get(`/work-time/${userId}/summary?day=${today}`);
            const lastEventData = lestEventResponse.data;
            const summaryData = summaryResponse.data

            if (lastEventData) {
                setLastEvent(lastEventData);
                const { eventType, eventTime } = lastEventData;
                const lastEventTime = (new Date(eventTime)).getTime() - 3600000;
                if (eventType === 'start') {
                    // Calculate the elapsed time since the "start" event
                    const nowDate = new Date()

                    const elapsedMilliseconds = nowDate.getTime() - lastEventTime + (summaryData.totalWorkTime * 1000);
                    const elapsedSeconds = new Date(); // Create a date object with the Unix Epoch
                    elapsedSeconds.setSeconds((elapsedMilliseconds/1000))

                    // Reset the stopwatch with the elapsed time
                    reset(elapsedSeconds, true);
                } else if (eventType === 'stop') {
                    // Calculate the elapsed time until the "stop" event
                    const elapsedSeconds = new Date(); // Create a date object with the Unix Epoch
                    elapsedSeconds.setSeconds(summaryData.totalWorkTime);
                    // Reset the stopwatch with the time at the last stop
                    reset(elapsedSeconds, false);
                }
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch the last event. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const recordEvent = async (eventType) => {
        try {
            setLoading(true);
            setError('');
            const apiUrl = `/work-time/${userId}/event`;
            await api.post(apiUrl, { eventType });
            console.log(`Event "${eventType}" recorded successfully.`);
        } catch (err) {
            console.error(err);
            setError('Failed to record the event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async () => {
        await recordEvent('start');
        start();
    };

    const handlePause = async () => {
        await recordEvent('stop');
        pause();
    };

    useEffect(() => {
        fetchLastEvent();
    }, []);

    return (
        <div className="tracking-container">
            <div>
                <h3>{isRunning ? 'Working' : 'In Pause'}</h3>
                <div className="tracking-timer">
                    <span>{String(hours).padStart(2, '0')}</span>:
                    <span>{String(minutes).padStart(2, '0')}</span>:
                    <span>{String(seconds).padStart(2, '0')}</span>
                </div>
            </div>
            <div className="tracking-buttons">
                <button
                    disabled={isRunning || loading}
                    className="start-tracking"
                    onClick={handleStart}
                >
                    Start
                </button>
                <button
                    disabled={!isRunning || loading}
                    className="end-tracking"
                    onClick={handlePause}
                >
                    Stop
                </button>
            </div>
            {loading && <p>Processing...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default TrackingComponent;
