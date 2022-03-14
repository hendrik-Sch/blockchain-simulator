import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import PositionsMenu from './positionsMenu';

function SwitchPosition(props) {
    const { selectedIngredients, onPositionChange } = props;

    const [anchorEl, setAnchorEl] = useState();

    const handleClick = ({ target }) => {
        setAnchorEl(target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePositionChange = (...args) => {
        handleClose();

        return onPositionChange(...args);
    };

    const tooltip = "Position ändern";
    const disabled = selectedIngredients.length <= 0;

    return (
        <Fragment>
            <Tooltip title={tooltip}>
                <span>
                    <IconButton onClick={handleClick} disabled={disabled} color="primary">
                        <DoubleArrowIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <PositionsMenu
                anchorEl={anchorEl}
                onClose={handleClose}
                onPositionChange={handlePositionChange}
            />
        </Fragment>
    );
}

SwitchPosition.propTypes = {
    selectedIngredients: PropTypes.array.isRequired,
    onPositionChange: PropTypes.func.isRequired
};

export default SwitchPosition;