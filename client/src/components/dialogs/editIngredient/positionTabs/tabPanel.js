import React from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

function PositionTabPanel(props) {
    const { positions, hide, prefix, value, onChange } = props;

    if (hide) {

        return null;
    }

    if (!Array.isArray(positions)) {
        const emptyLabel = `No positions configured.`;

        return <Typography>
            {emptyLabel}
        </Typography>;
    }

    return (
        <RadioGroup
            value={value}
            onChange={onChange}
        >
            {positions.map((pos, index) => (
                <FormControlLabel
                    key={index}
                    value={`${prefix}-${pos.label}`}
                    control={<Radio />}
                    label={pos.label}
                />
            ))}
        </RadioGroup>
    );
}

PositionTabPanel.propTypes = {
    positions: PropTypes.array,
    hide: PropTypes.bool,
    prefix: PropTypes.string,

    value: PropTypes.string,
    onChange: PropTypes.func
};

export default PositionTabPanel;