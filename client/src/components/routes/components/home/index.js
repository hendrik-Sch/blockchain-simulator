import React from 'react';

import { makeStyles } from '@mui/styles';
import { Divider, Grid, Typography } from '@mui/material';

import RolesDefinition from '../../../../data/RolesDefinition.json';
import CustomLink from './customLink';

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(2, 0)
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h1">Start Menü</Typography>
            <Typography variant="subtitle1">Wählen Sie Ihre zugewisene Rolle aus:</Typography>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
                {RolesDefinition.map((role, index) => (
                    <Grid key={index} item xs={6}>
                        <CustomLink
                            label={role.label}
                            link={role.link}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;