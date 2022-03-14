import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardHeader } from '@mui/material';

function CustomLink(props) {
    const { label, link } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    const buttonLabel = `Auswählen`;

    return (
        <Card>
            <CardHeader title={label} />
            <CardActions>
                <Button onClick={handleClick}>
                    {buttonLabel}
                </Button>
            </CardActions>
        </Card>
    );
}

CustomLink.propTypes = {
    label: PropTypes.string,
    link: PropTypes.string
};

export default CustomLink;