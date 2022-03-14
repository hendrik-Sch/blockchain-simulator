import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import { Typography } from '@mui/material';

import SocketContext from '../../../../context/socket';

import ProductsDisplay from '../../../productsDisplay/';
import AddBlockDialog from '../../../dialogs/addBlock';
import SwitchPosition from './switchPosition';

import { INGREDIENT_ID, INGREDIENT_POS, PRODUCT_ID, TIMESTAMP } from '../../../dataDefinition';
import PositionsDefinition from '../../../../data/positionsDefinition.json';
import ProduceButton from './produceButton';

const GetNextIngredientId = (blocks) => {
    let nextIngredientId = 0;

    blocks.forEach(block => {
        if (block.data[INGREDIENT_ID] >= nextIngredientId) {
            nextIngredientId = block.data[INGREDIENT_ID] + 1;
        }
    });

    return nextIngredientId;
};

const GetPrevBlock = (newBlock, allBlocks) => {
    const predicate = (block) => newBlock[INGREDIENT_ID] === block.data[INGREDIENT_ID];

    return _.findLast(allBlocks, predicate);
};

const GetPrefix = (position) => {
    const prefixes = PositionsDefinition.map(pos => pos.short);

    return prefixes.find(prefix => String(position).startsWith(prefix));
};

const Blockchain = () => {
    const socket = useContext(SocketContext);

    const [blockchain, setBlockchain] = useState();
    const iniSelcIngredients = new Array();
    const [selectedIngredients, setSelectedIngredients] = useState(iniSelcIngredients);

    useEffect(() => {
        if (socket) {
            socket.on('blockchain', (newBlockchain) => {
                setBlockchain(newBlockchain);
            });
            socket.emit('request blockchain');
            socket.emit('select role', "blockchain");
        }

        return () => socket && socket.emit('deselect role');

    }, [socket]);

    const handleAdd = (newBlocksData) => {
        const nextIngredientId = GetNextIngredientId(blockchain.storage);
        newBlocksData.forEach((newBlockData, index) => {
            newBlockData[INGREDIENT_ID] = nextIngredientId + index;
            socket.emit('add block', newBlockData);
        });
    };

    const emitSmartContract = (newBlockData) => {
        const prevBlock = GetPrevBlock(newBlockData, blockchain.storage);
        const prevPos = GetPrefix(prevBlock.data[INGREDIENT_POS]);
        const newPos = GetPrefix(newBlockData[INGREDIENT_POS]);
        if (prevPos !== newPos) {
            const event = `position switch ${prevPos} to ${newPos}`;
            socket.emit(event, newBlockData);
        }
    };

    const handleEdit = (newBlockdata) => {
        setSelectedIngredients(iniSelcIngredients);
        const productId = newBlockdata[PRODUCT_ID];
        if (_.isUndefined(productId)) {
            socket.emit('add block', newBlockdata);
            emitSmartContract(newBlockdata);

            return;
        }

        const allIngredients = blockchain.storage
            .filter(block => block.data[PRODUCT_ID] === productId)
            .sort((a, b) => b[TIMESTAMP] - a[TIMESTAMP]);

        const products = _.uniq(allIngredients, true, block => block.data[INGREDIENT_ID]);

        let smartContractEmited = false;
        products.forEach(product => {
            delete newBlockdata[INGREDIENT_ID];
            const blockToAdd = _.defaults(newBlockdata, product.data);
            socket.emit('add block', blockToAdd);

            if (!smartContractEmited) {
                smartContractEmited = true;
                emitSmartContract(newBlockdata);
            }
        });

        setSelectedIngredients(iniSelcIngredients);
    };

    const handlePositionChange = (newPosition) => {
        selectedIngredients.forEach(ingredient => {
            const newData = _.cloneDeep(ingredient);
            newData[INGREDIENT_POS] = newPosition;
            handleEdit(newData);
        });
    };

    const handleProduce = () => {
        setSelectedIngredients(iniSelcIngredients);
    };

    return (
        <main>
            <Typography variant="h3">Blockchain</Typography>
            <AddBlockDialog
                onAdd={handleAdd}
            />
            <SwitchPosition
                selectedIngredients={selectedIngredients}
                onPositionChange={handlePositionChange}
            />
            <ProduceButton
                selectedIngredients={selectedIngredients}
                blockchain={blockchain}
                onProduce={handleProduce}
            />
            <ProductsDisplay
                blockchain={blockchain}

                selectedIngredients={selectedIngredients}
                onSelectedIngredientsChange={setSelectedIngredients}
            />
        </main>
    );
};

export default Blockchain;