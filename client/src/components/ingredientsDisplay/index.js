import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { List } from '@mui/material';

import IngredientDisplay from './ingredient';

import { INGREDIENT_ID, TIMESTAMP } from '../dataDefinition';

const ExtractIngredientsFromBlocks = (blocks) => {
    const filtredBlocks = blocks.reduce((acc, curr) => {
        const ingredientID = curr.data[INGREDIENT_ID];

        const hasIngredientId = typeof ingredientID === 'undefined' || ingredientID === null;
        const isAllreadyInAcc = acc[ingredientID] && acc[ingredientID][TIMESTAMP] > curr[TIMESTAMP];
        if (hasIngredientId || isAllreadyInAcc) {

            return acc;
        }

        acc[ingredientID] = curr;

        return acc;
    }, {});

    return Object.keys(filtredBlocks)
        .map(key => filtredBlocks[key])
        .sort((a, b) => {
            const aT = a.data[TIMESTAMP];
            const bT = b.data[TIMESTAMP];

            return aT - bT;
        });
};

const IngredientsDisplay = (props) => {
    const { blockchain, onIngredientClicked, selectedIngredients, onSelectedIngredientsChange } = props;

    if (!blockchain || !blockchain.storage) {

        return null;
    }

    const blocks = _.cloneDeep(blockchain.storage).reverse();

    const ingredients = ExtractIngredientsFromBlocks(blocks);

    const handleSelect = (ingredient) => {
        const newSelectedIngredients = _.cloneDeep(selectedIngredients);
        newSelectedIngredients.push(ingredient);
        onSelectedIngredientsChange && onSelectedIngredientsChange(newSelectedIngredients);
    };

    const handleDeSelect = (ingredient) => {
        const newSelectedIngredients = selectedIngredients
            .filter((item) => item[INGREDIENT_ID] !== ingredient[INGREDIENT_ID]);
        onSelectedIngredientsChange && onSelectedIngredientsChange(newSelectedIngredients);
    };

    const selectedIngredientIds = selectedIngredients.map(item => item[INGREDIENT_ID]);

    return (
        <List>
            {ingredients.map((ingredient) => (
                <IngredientDisplay
                    key={ingredient.data[INGREDIENT_ID]}
                    block={ingredient}
                    onClick={onIngredientClicked}

                    selected={selectedIngredientIds.includes(ingredient.data[INGREDIENT_ID])}
                    onSelect={handleSelect}
                    onDeselect={handleDeSelect}
                />
            ))}
        </List>
    );
};

IngredientsDisplay.propTypes = {
    blockchain: PropTypes.shape({
        storage: PropTypes.array
    }),
    onIngredientClicked: PropTypes.func,

    selectedIngredients: PropTypes.array.isRequired,
    onSelectedIngredientsChange: PropTypes.func
};

export default IngredientsDisplay;