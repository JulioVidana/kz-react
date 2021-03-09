import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { obtenerLlamadasAccion, obtenerAgentesLlamadas } from 'src/redux/encuestasGlobalDucks'

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Button,
    Typography,
    makeStyles,
    CardActions,
    colors
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
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
    green: {
        color: '#fff',
        backgroundColor: colors.green[500],
    },
    gris: {
        color: '#fff',
        backgroundColor: colors.grey[500],
    }
}));

const EncuestaCard = ({ encuesta }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const iraDetalle = () => {
        dispatch(obtenerLlamadasAccion(encuesta))
            .then(() => {
                dispatch(obtenerAgentesLlamadas(encuesta))
                navigate('/app/encuestadetalle')
            })
    }

    return (
        <Card >
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Avatar
                        className={encuesta.estatus === 'activa' ? classes.green : classes.gris}>
                        <AssignmentIcon />
                    </Avatar>
                    <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                    >
                        {
                            encuesta.nombre
                        }
                    </Typography>
                    <Typography
                        align='center'
                        color="textSecondary"
                        variant="h6"
                    >
                        Origen:
                        {
                            encuesta.origen.length > 7 ?
                                'TODAS'
                                :
                                encuesta.origen.join(", ")
                        }

                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        Padrón: {encuesta.totalPadron}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        Estatus: {encuesta.estatus}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={() => iraDetalle()}
                >
                    Ver Detalle
          </Button>
            </CardActions>
        </Card>

    )
}

export default EncuestaCard
