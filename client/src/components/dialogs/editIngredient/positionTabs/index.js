import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { Tab, Tabs, Typography } from '@mui/material';

import PositionsDefinition from '../../../../data/positionsDefinition.json';
import PositionTabPanel from './tabPanel';

const useStyles = makeStyles(() => ({
    tabRoot: {
        minWidth: 72
    }
}));

function PositionsTabs(props) {
    const { label, value, onChange } = props;

    const classes = useStyles();

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabChange = (evt, newValue) => {
        setActiveTabIndex(newValue);
    };

    return (
        <div>
            <Typography>{label}</Typography>
            <Tabs
                variant="scrollable"
                value={activeTabIndex}
                onChange={handleTabChange}
            >
                {PositionsDefinition.map((item, index) => (
                    <Tab
                        key={index}
                        label={item.short}
                        value={index}
                        classes={{ root: classes.tabRoot }}
                    />
                ))}
            </Tabs>
            {PositionsDefinition.map((item, index) => (
                <PositionTabPanel
                    key={index}
                    hide={index !== activeTabIndex}
                    prefix={item.short}
                    positions={item.positions}

                    value={value}
                    onChange={onChange}
                />
            ))}
        </div>
    );
}

PositionsTabs.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default PositionsTabs;