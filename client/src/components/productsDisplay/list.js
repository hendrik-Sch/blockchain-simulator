import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { makeStyles } from '@mui/styles';
import { List, Typography } from '@mui/material';

import ProductDisplay from './product';

import { INGREDIENT_ID, INGREDIENT_POS, PRODUCT_ID, TIMESTAMP } from '../dataDefinition';

const useStyles = makeStyles((theme) => ({
    emptyLabel: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    }
}));

const ExtractIngredientsFromBlocks = (blocks, positionPrefix) => {
    const productIds = new Array();
    const ingredientIdsWhichAreProducts = new Array();
    const filtredBlocks = blocks.reduce((acc, curr) => {
        const ingredientID = curr.data[INGREDIENT_ID];
        const productId = curr.data[PRODUCT_ID];

        const isProduct = !_.isUndefined(productId);

        const hasIngredientId = typeof ingredientID === 'undefined' || ingredientID === null;
        const ingredientIsAllreadyInAcc = acc[ingredientID] && acc[ingredientID][TIMESTAMP] > curr[TIMESTAMP];
        const productIsAllreadyInAcc = isProduct && productIds.includes(productId);
        const ingredientIsProduct = ingredientIdsWhichAreProducts.includes(ingredientID);
        if (hasIngredientId || ingredientIsAllreadyInAcc || productIsAllreadyInAcc || ingredientIsProduct) {
            if (productIsAllreadyInAcc) {
                ingredientIdsWhichAreProducts.push(ingredientID);
            }

            return acc;
        }

        if (isProduct) {
            productIds.push(productId);
            ingredientIdsWhichAreProducts.push(ingredientID);
        }

        acc[ingredientID] = curr;

        return acc;
    }, {});

    return Object.keys(filtredBlocks)
        .map(key => filtredBlocks[key])
        .filter(product => String(product.data[INGREDIENT_POS]).startsWith(positionPrefix))
        .sort((a, b) => {
            const aT = a[TIMESTAMP];
            const bT = b[TIMESTAMP];

            return bT - aT;
        });
};

const ProductsList = (props) => {
    const { hide, blockchain, selectedIngredients, onSelectedIngredientsChange, positionPrefix } = props;

    const classes = useStyles();

    if (hide || !blockchain || !blockchain.storage) {

        return null;
    }

    const blocks = _.cloneDeep(blockchain.storage).reverse();

    const products = ExtractIngredientsFromBlocks(blocks, positionPrefix);
    if (products.length <= 0) {
        const emptyLabel = `Keine Zutaten oder Produkte auf ${positionPrefix}`;

        return <Typography className={classes.emptyLabel}>{emptyLabel}</Typography>;
    }

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
            {products.map((ingredient) => (
                <ProductDisplay
                    key={ingredient.data[INGREDIENT_ID]}
                    block={ingredient}

                    selected={selectedIngredientIds.includes(ingredient.data[INGREDIENT_ID])}
                    onSelect={handleSelect}
                    onDeselect={handleDeSelect}
                />
            ))}
        </List>
    );
};

ProductsList.propTypes = {
    hide: PropTypes.bool,
    blockchain: PropTypes.shape({
        storage: PropTypes.array
    }),

    selectedIngredients: PropTypes.array.isRequired,
    onSelectedIngredientsChange: PropTypes.func,
    positionPrefix: PropTypes.string
};

export default ProductsList;