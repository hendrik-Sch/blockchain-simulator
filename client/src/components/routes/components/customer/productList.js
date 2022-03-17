import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { INGREDIENT, INGREDIENT_POS, PRODUCT_ID, TIMESTAMP } from '../../../dataDefinition';
import TimeFromNowDisplay from '../../../timeFromNowDisplay';
import ListButtons from './listButtons';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: theme.palette.secondary.main
    }
}));

const RetriveProductsFromBlocks = (blocks) => {
    const productRegister = new Object();

    blocks.forEach(block => {
        const prodId = block.data[PRODUCT_ID];

        const isNotSet = typeof prodId === 'undefined' || prodId === null;

        if (isNotSet) {

            return;
        }

        if (block.data[INGREDIENT_POS] !== "Endkunde") {

            return;
        }

        if (productRegister[prodId]) {
            const registredTimestamp = productRegister[prodId][TIMESTAMP];
            const currentTimestamp = block[TIMESTAMP];
            if (registredTimestamp >= currentTimestamp) {

                return;
            }
        }

        productRegister[prodId] = block;
    });


    return Object.keys(productRegister)
        .map(key => productRegister[key])
        .sort((a, b) => b[TIMESTAMP] - a[TIMESTAMP]);
};

function ProductList(props) {
    const { blockchain } = props;

    const classes = useStyles();

    if (!blockchain) {

        return null;
    }

    const products = RetriveProductsFromBlocks(blockchain.storage);

    return (
        <List>
            {products.map(block => (
                <ListItem key={block.hash}
                    secondaryAction={<ListButtons block={block} />}
                >
                    <ListItemIcon className={classes.icon}>
                        {block.data[PRODUCT_ID]}
                    </ListItemIcon>
                    <ListItemText
                        primary={block.data[INGREDIENT]}
                        secondary={<TimeFromNowDisplay dateTime={block[TIMESTAMP]} />}
                    />
                </ListItem>
            ))}
        </List>
    );
}

ProductList.propTypes = {
    blockchain: PropTypes.shape({
        storage: PropTypes.array
    })
};

export default ProductList;