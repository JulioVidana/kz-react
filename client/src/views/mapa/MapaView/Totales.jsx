import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    colors
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        height: '100%',

    },
    titulo: {
        textAlign: 'center'
    },
    total: {
        color: colors.red[600],
        textAlign: 'center'
    }
}));

const Totales = (props) => {
    const classes = useStyles();

    return (
        <Card

        >
            <CardContent className={classes.root}>
                <Typography
                    color="textSecondary"
                    className={classes.titulo}
                    gutterBottom
                    variant="h4">
                    TOTAL DE APOYOS
                        </Typography>
                <Typography
                    color="textPrimary"
                    className={classes.total}
                    variant="h2">
                    {props.total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Totales
