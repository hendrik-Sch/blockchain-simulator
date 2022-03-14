import React, { /* useEffect, useRef, */ useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { INGREDIENT_POS, TRANSPORT_ORDER_ID } from '../../dataDefinition';
import PositionsTabs from './positionTabs';

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2, 0)
    }
}));

function EditForm(props) {
    const { defaultFormData, onSubmit, formRef } = props;

    const classes = useStyles();

    const [formData, setFormData] = useState(defaultFormData);

    const createChangeHandler = (key) => {
        return ({ target: { value } }) => {
            const newFormData = _.cloneDeep(formData);
            newFormData[key] = value;
            setFormData(newFormData);
        };
    };

    const TOInputLabel = "Transportauftrag";
    const TOValue = formData[TRANSPORT_ORDER_ID] || "";
    const handleTOChange = createChangeHandler(TRANSPORT_ORDER_ID);

    const posInputLabel = "Position";
    const posValue = formData[INGREDIENT_POS];
    const handlePosChange = createChangeHandler(INGREDIENT_POS);

    const handleSubmit = evt => {
        evt.preventDefault();

        const newFormData = _.cloneDeep(formData);
        onSubmit(newFormData);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} className={classes.form}>
            <TextField
                label={TOInputLabel}
                value={TOValue}
                fullWidth
                onChange={handleTOChange}
            />
            <PositionsTabs
                label={posInputLabel}
                value={posValue}
                onChange={handlePosChange}
            />
        </form >
    );
}

EditForm.propTypes = {
    defaultFormData: PropTypes.object,
    onSubmit: PropTypes.func,
    formRef: PropTypes.object
};

export default EditForm;