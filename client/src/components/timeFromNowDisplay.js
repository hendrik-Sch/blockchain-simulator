import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const UPDATE_INTERVAL = 60 * 1000;

function TimeFromNowDisplay(props) {
    const { dateTime } = props;

    const initialTime = Moment(dateTime).fromNow();
    const [currentTime, setCurrentTime] = useState(initialTime);

    useEffect(() => {
        const intv = setInterval(() => {
            const newCurrentTime = Moment(dateTime).fromNow();
            setCurrentTime(newCurrentTime);
        }, UPDATE_INTERVAL);

        return () => clearInterval(intv);
    });

    return (
        <Fragment>
            {currentTime}
        </Fragment>
    );
}

TimeFromNowDisplay.propTypes = {
    dateTime: PropTypes.number
};

export default TimeFromNowDisplay;