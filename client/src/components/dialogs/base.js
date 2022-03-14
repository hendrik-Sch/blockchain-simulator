import React from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function BaseDialog(props) {
    const { title, children, onClose, onSave, ...others } = props;

    const closeButtonLabel = "abbrechen";
    const saveButtonLabel = "speichern";

    return (
        <Dialog {...others} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {closeButtonLabel}
                </Button>
                <Button color="primary" onClick={onSave}>
                    {saveButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

BaseDialog.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};

export default BaseDialog;