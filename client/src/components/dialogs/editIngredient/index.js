import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import BaseDialog from '../base';

import { INGREDIENT, INGREDIENT_ID } from '../../dataDefinition';
import EditForm from './form';

const getTitleTitle = (data) => {
    if (!data) {

        return "";
    }

    if (Array.isArray(data)) {
        const ids = data.map(item => item[INGREDIENT_ID]);

        return `Die Zutaten ${ids.join(", ")} werden bearbeitet`;
    }

    return `Zutat ${data[INGREDIENT_ID]} - ${data[INGREDIENT]} bearbeiten`;
};

function EditIngredientDialog(props) {
    const { onClose, data, onEdit } = props;

    const cachedDataRef = useRef(data);
    const formRef = useRef();

    const openDialog = Boolean(data);
    if (data) {
        cachedDataRef.current = data;
    }
    const cachedData = cachedDataRef.current;

    const editTitle = getTitleTitle(cachedData);
    const handleSave = () => {
        const submitEvent = new Event("submit", { cancelable: true, bubbles: true });
        formRef.current.dispatchEvent(submitEvent);
    };

    const handleSubmit = (newFormData) => {
        if (!Array.isArray(cachedData)) {
            onEdit(newFormData);

            return;
        }

        data.forEach((/* ingredient */) => {

            onEdit(Object.assign());
        });
    };

    return (
        <BaseDialog
            open={openDialog}
            title={editTitle}
            onClose={onClose}
            onSave={handleSave}
        >
            <EditForm
                formRef={formRef}
                defaultFormData={cachedData}
                onSubmit={handleSubmit}
            />
        </BaseDialog>
    );
}

EditIngredientDialog.propTypes = {
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

export default EditIngredientDialog;