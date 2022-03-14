import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INGREDIENT, INGREDIENT_ID, INGREDIENT_POS, INGREDIENT_TEMP, TRANSPORT_ORDER_ID } from '../dataDefinition';

const useStyles = makeStyles(() => ({
    icon: {
        fontSize: '2em',
        fontWeight: 'bold'
    }
}));

const generatePrimaryText = (block) => {
    const { data } = block;

    if (data.message) {

        return data.message;
    }

    const transportOrder = data[TRANSPORT_ORDER_ID] ? ` mit TA ${data[TRANSPORT_ORDER_ID]}` : "";

    return `${data[INGREDIENT]} | ${data[INGREDIENT_TEMP]}˚C auf ${data[INGREDIENT_POS]}${transportOrder}`;
};

function generateSecondaryText(block) {
    const { timestamp, data } = block;

    if (data.details) {

        return `${Moment(timestamp).format('L LTS')} | ${data.details}`;
    }

    return Moment(timestamp).format("L LTS");
}

const BlockDisplay = (props) => {
    const { block, onClick } = props;
    const { data } = block;

    const classes = useStyles();

    const isClickable = Boolean(onClick);

    const primary = generatePrimaryText(block);
    const secondary = generateSecondaryText(block);

    const handleClick = () => {
        isClickable && onClick(block);
    };

    return (
        <ListItem onClick={handleClick} button={isClickable}>
            <ListItemIcon className={classes.icon}>
                {data[INGREDIENT_ID]}
            </ListItemIcon>
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
        </ListItem>
    );
};

BlockDisplay.propTypes = {
    block: PropTypes.shape({
        hash: PropTypes.string,
        timestamp: PropTypes.number,
        data: PropTypes.object.isRequired
    }),
    onClick: PropTypes.func
};

export default BlockDisplay;