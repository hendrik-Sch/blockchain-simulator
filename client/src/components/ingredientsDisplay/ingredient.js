import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INGREDIENT, INGREDIENT_ID, INGREDIENT_POS, INGREDIENT_TEMP, TRANSPORT_ORDER_ID } from '../dataDefinition';

const useStyles = makeStyles(() => ({
    icon: {
        fontSize: '2em',
        fontWeight: 'bold'
    }
}));

const IngredientDisplay = (props) => {
    const { block, onClick, selected, onSelect, onDeselect } = props;
    const { /* hash, */ timestamp, data } = block;

    const classes = useStyles();

    const isClickable = Boolean(onClick);

    const transportOrder = data[TRANSPORT_ORDER_ID] ? ` mit TA ${data[TRANSPORT_ORDER_ID]}` : "";
    const primary = `${data[INGREDIENT]} | ${data[INGREDIENT_TEMP]}˚C auf ${data[INGREDIENT_POS]}${transportOrder}`;
    const secondary = Moment(timestamp).format('L LTS');

    const handleClick = () => {
        isClickable && onClick(block);
    };

    const handleCheckboxClick = () => {
        if (selected) {
            onDeselect(data);
        } else {
            onSelect(data);
        }
    };

    return (
        <ListItem
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleCheckboxClick}
                    checked={selected}
                />}
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon className={classes.icon}>
                    {data[INGREDIENT_ID]}
                </ListItemIcon>
                <ListItemText
                    primary={primary}
                    secondary={secondary}
                />
            </ListItemButton>
        </ListItem>
    );
};

IngredientDisplay.propTypes = {
    block: PropTypes.shape({
        // hash: PropTypes.string,
        timestamp: PropTypes.number,
        data: PropTypes.object.isRequired
    }),
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired
};

export default IngredientDisplay;