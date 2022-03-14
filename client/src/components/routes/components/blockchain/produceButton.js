import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { IconButton, Tooltip } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';

import SocketContext from '../../../../context/socket';
import { INGREDIENT, INGREDIENT_POS, PRODUCT_ID } from '../../../dataDefinition';

function GetNextProductId(blocks) {
    let nextProductId = 0;

    blocks.forEach(block => {
        if (block.data[PRODUCT_ID] >= nextProductId) {
            nextProductId = block.data[PRODUCT_ID] + 1;
        }
    });

    return nextProductId;
}

function ProduceButton(props) {
    const { selectedIngredients, onProduce, blockchain } = props;
    const socket = useContext(SocketContext);

    const tooltip = "Spaghetti produzieren";
    const disabled = selectedIngredients.length <= 0;

    const handleClick = () => {
        selectedIngredients.forEach(ingredient => {
            const newBlock = _.cloneDeep(ingredient);
            newBlock[PRODUCT_ID] = GetNextProductId(blockchain.storage);
            newBlock[INGREDIENT_POS] = "H-WA";
            newBlock[INGREDIENT] = "Spaghetti Bolognese";
            socket.emit('add block', newBlock);
        });

        onProduce();
    };

    return (
        <Tooltip title={tooltip}>
            <span>
                <IconButton onClick={handleClick} disabled={disabled} color="primary">
                    <FactoryIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}

ProduceButton.propTypes = {
    selectedIngredients: PropTypes.array,
    blockchain: PropTypes.shape({
        storage: PropTypes.array
    }),
    onProduce: PropTypes.func.isRequired
};

export default ProduceButton;