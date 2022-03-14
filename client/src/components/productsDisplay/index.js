import React, { Fragment, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Tab, Tabs } from '@mui/material';

import PositionsDefinition from '../../data/positionsDefinition.json';
import ProductsList from './list';

const useStyles = makeStyles(() => ({
    tabRoot: {
        minWidth: 72,
        flex: 1
    }
}));

function ProductsDisplay(props) {
    const others = Object.assign({}, props);

    const classes = useStyles();

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabChange = (evt, newValue) => {
        setActiveTabIndex(newValue);
    };

    return (
        <Fragment>
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
                <ProductsList
                    key={index}
                    hide={index !== activeTabIndex}
                    positionPrefix={item.short}

                    {...others}
                />
            ))}
        </Fragment>
    );
}

export default ProductsDisplay;