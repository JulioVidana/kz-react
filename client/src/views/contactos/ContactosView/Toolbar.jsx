import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {},
    texto: {
        marginLeft: theme.spacing(1)
    }
}));


const Toolbar = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h3">
                Encuesta: Primer Arranque
            </Typography>
        </div>
    )
}

export default Toolbar
