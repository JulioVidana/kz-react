import React from 'react'
import { makeStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Grid } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    coloniaTitulo: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));


const TotalApoyos = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" className={classes.coloniaTitulo} >
                        {props.datos._id}
                    </Typography>
                </Grid>
                <Grid item xs={12}  >

                    <List component="nav" aria-label="main mailbox folders">
                        {
                            props.datos.apoyos.map(item => (
                                <ListItem button key={item}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.orange}>-</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item} />
                                </ListItem>

                            ))}

                    </List>



                </Grid>
            </Grid>

        </div>
    )
}

export default TotalApoyos
