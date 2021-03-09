import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    makeStyles,
    Grid
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    },
    textoDatos: {
        textAlign: 'center'
    },
    statsIcon: {
        marginRight: theme.spacing(1)
    },
    statsItem: {
        alignItems: 'center',
        display: 'flex',
        paddingTop: theme.spacing(1)
    },
}));

const PersonaDetalle = (props) => {
    const classes = useStyles();
    const { persona } = props;
    //const persona = useSelector(store => store.encuestas.persona);
    return (
        <Card
            className={classes.root}
        >
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Avatar
                        className={classes.avatar}
                        src=""
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        className={classes.textoDatos}
                        variant="h4"
                    >
                        {
                            persona.length !== 0 && `${persona[0].Nombre} ${persona[0].aPaterno} ${persona[0].aMaterno}`
                        }
                    </Typography>
                    <Grid item className={classes.statsItem}>
                        <LocationOnIcon
                            className={classes.statsIcon}
                            color="action"
                        />
                        <Typography
                            color="textSecondary"
                            variant="h6"
                        >
                            {
                                persona.length !== 0 && persona[0].colonia
                            }
                        </Typography>
                    </Grid>

                    <Grid item className={classes.statsItem}>
                        <PhoneIcon
                            className={classes.statsIcon}
                            color="action"
                        />
                        <Typography
                            className={classes.dateText}
                            color="secondary"
                            variant="h6"
                        >
                            {
                                persona.length !== 0 &&
                                `${persona[0].telefono === null ? '-' : persona[0].telefono} 
                            ${persona[0].telefono2 === null ? '' : '- ' + persona[0].telefono2} 
                            ${persona[0].telefono3 === null ? '' : '- ' + persona[0].telefono3}`
                            }
                        </Typography>

                    </Grid>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                >
                    Editar
          </Button>
            </CardActions>
        </Card>
    );
};

PersonaDetalle.propTypes = {
    className: PropTypes.string
};

export default PersonaDetalle
