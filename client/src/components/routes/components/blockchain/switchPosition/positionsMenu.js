import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Menu, MenuItem } from '@mui/material';

import PositionsDefinition from '../../../../../data/positionsDefinition.json';

const serialisedPositions = PositionsDefinition
    .reduce((acc, curr) => {
        const positions = new Array();

        if (curr.positions) {
            curr.positions.forEach(pos => {
                positions.push({
                    label: `${curr.short}-${pos.label}`
                });
            });
        } else {
            positions.push({
                label: curr.description
            });
        }

        if (acc.length !== 0) {
            positions.unshift({
                divider: true
            });
        }

        return [...acc, ...positions];
    }, new Array());

function PositionsMenu(props) {
    const { anchorEl, onClose, onPositionChange } = props;

    const menuOpen = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={onClose}
            PaperProps={{
                sx: {
                    maxHeight: '70vh'
                }
            }}
        >
            {serialisedPositions.map((pos, index) => {
                if (pos.divider) {

                    return <Divider key={index} />;
                }

                const handleMenuItemClick = () => onPositionChange(pos.label);

                return (
                    <MenuItem key={index} onClick={handleMenuItemClick}>
                        {pos.label}
                    </MenuItem>
                );
            })}
        </Menu>
    );
}

PositionsMenu.propTypes = {
    anchorEl: PropTypes.object,
    onClose: PropTypes.func,
    onPositionChange: PropTypes.func.isRequired
};

export default PositionsMenu;