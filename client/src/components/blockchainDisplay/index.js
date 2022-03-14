import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { List } from '@mui/material';

import BlockDisplay from './block';

const BlockchainDisplay = (props) => {
    const { blockchain, onBlockClicked } = props;

    if (!blockchain || !blockchain.storage) {

        return null;
    }

    const blocks = _.cloneDeep(blockchain.storage).reverse();

    return (
        <List>
            {blocks.map((block) => (
                <BlockDisplay
                    key={block.hash}
                    block={block}
                    onClick={onBlockClicked}
                />
            ))}
        </List>
    );
};

BlockchainDisplay.propTypes = {
    blockchain: PropTypes.shape({
        storage: PropTypes.array
    }),
    onBlockClicked: PropTypes.func
};

export default BlockchainDisplay;