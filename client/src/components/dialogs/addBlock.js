import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { INGREDIENT, INGREDIENT_GREY, INGREDIENT_RED, INGREDIENT_YELLOW, INGREDIENT_POS } from '../dataDefinition';

import BaseDialog from './base';

const INITIAL_INGREDIANT = null;
const INITIAL_AMOUNT = 2;

function AddBlockDialog(props) {
    const { onAdd } = props;

    const [dialoOpen, setDialogOpen] = useState(false);
    const [amount, setAmount] = useState(INITIAL_AMOUNT);
    const [ingredient, selectIngredient] = useState(INITIAL_INGREDIANT);

    const addButtonTooltip = "Neue Zutat erstellen";

    const title = "Zutat hinzufügen";
    const radioButtonsLabel = "Zutat";

    const radioGroupId = "addBlockRadioGroupId";

    const handleButtonClick = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
        setAmount(INITIAL_AMOUNT);
        selectIngredient(INITIAL_INGREDIANT);
    };

    const handleSave = () => {

        if (amount && ingredient) {
            const ingredientsToAdd = new Array();
            for (let i = 0; i < amount; i++) {
                ingredientsToAdd.push({
                    [INGREDIENT_POS]: "Z",
                    [INGREDIENT]: ingredient
                });
            }

            onAdd(ingredientsToAdd);
        }

        closeDialog();
    };

    const handleChange = evt => setAmount(evt.target.value);
    const handle1Click = () => setAmount(1);
    const handle2Click = () => setAmount(2);
    const handle3Click = () => setAmount(3);
    const handle4Click = () => setAmount(4);

    const handleRadioChange = evt => selectIngredient(evt.target.value);

    return (
        <Fragment>
            <Tooltip title={addButtonTooltip}>
                <IconButton onClick={handleButtonClick} color="primary">
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <BaseDialog title={title} open={dialoOpen} onClose={closeDialog} onSave={handleSave}>
                <Grid container>
                    <Grid item sm={6}>
                        <Button onClick={handle1Click}>1x</Button>
                        <Button onClick={handle2Click}>2x</Button>
                        <Button onClick={handle3Click}>3x</Button>
                        <Button onClick={handle4Click}>4x</Button>
                        <TextField fullWidth type="number" min="1" step="1" value={amount} onChange={handleChange} />
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id={radioGroupId}>{radioButtonsLabel}</FormLabel>
                            <RadioGroup value={ingredient} onChange={handleRadioChange} aria-labelledby={radioGroupId}>
                                <FormControlLabel value={INGREDIENT_RED} control={<Radio />} label="Tomatensauce" />
                                <FormControlLabel value={INGREDIENT_YELLOW} control={<Radio />} label="Nudeln" />
                                <FormControlLabel value={INGREDIENT_GREY} control={<Radio />} label="Hackfleisch" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </BaseDialog>
        </Fragment>
    );
}

AddBlockDialog.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddBlockDialog;