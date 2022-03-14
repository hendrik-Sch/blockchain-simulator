import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INGREDIENT, INGREDIENT_ID, INGREDIENT_POS, INGREDIENT_TEMP, PRODUCT_ID, TRANSPORT_ORDER_ID } from '../dataDefinition';
import TimeFromNowDisplay from '../timeFromNowDisplay';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '2em',
        fontWeight: 'bold'
    },
    isProduct: {
        color: theme.palette.secondary.main
    }
}));

const ProductDisplay = (props) => {
    const { block, /* onClick, */ selected, onSelect, onDeselect } = props;
    const { /* hash, */ timestamp, data } = block;

    const classes = useStyles();

    // const isClickable = Boolean(onClick);

    const transportOrder = data[TRANSPORT_ORDER_ID] ? ` mit TA ${data[TRANSPORT_ORDER_ID]}` : "";
    const primary = `${data[INGREDIENT]}${transportOrder} bei ${data[INGREDIENT_TEMP]}˚C`;
    const secondary = <Fragment>
        <TimeFromNowDisplay dateTime={timestamp} /> auf {data[INGREDIENT_POS]}
    </Fragment>;

    // const handleClick = () => {
    //     isClickable && onClick(block);
    // };

    const handleClick = () => {
        if (selected) {
            onDeselect(data);
        } else {
            onSelect(data);
        }
    };

    const isProduct = !_.isUndefined(data[PRODUCT_ID]);
    const iconClassName = cx(classes.icon, {
        [classes.isProduct]: isProduct
    });
    const iconContent = isProduct ? data[PRODUCT_ID] : data[INGREDIENT_ID];

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selected}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemIcon className={iconClassName}>
                    {iconContent}
                </ListItemIcon>
                <ListItemText
                    primary={primary}
                    secondary={secondary}
                />
            </ListItemButton>
        </ListItem>
    );
};

ProductDisplay.propTypes = {
    block: PropTypes.shape({
        // hash: PropTypes.string,
        timestamp: PropTypes.number,
        data: PropTypes.object.isRequired
    }),
    // onClick: PropTypes.func,
    selected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired
};

export default ProductDisplay;