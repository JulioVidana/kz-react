import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { noContestoAccion } from 'src/redux/encuestasUsrDucks'
import {
    Container,
    Grid,
    makeStyles,
    Button,
    Box,
    Paper,
    Typography,
    IconButton
} from '@material-ui/core'
import {
    Close as CloseIcon,
    PhoneDisabled as PhoneDisabledIcon
} from '@material-ui/icons'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Page from 'src/components/Page'
import PersonaDetalle from './PersonaDetalle'
import EncuestaDetalle from './EncuestaDetalle'
//import Toolbar from './Toolbar';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(2)
    },
    botonNo: {
        color: "#fff",
        backgroundColor: "#f50057",
        '&:hover': {
            backgroundColor: "#CD034B",
            color: '#FFF'
        }
    },
    toolbarText: {
        marginLeft: theme.spacing(3)
    },
    avisoContent: {
        //margin: theme.spacing(2),
        textAlign: 'center',
        padding: theme.spacing(2),
        color: '#fff',
        background: '#ff9800',
    },
    titleIcon: {

        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }

}));


const EncuestaAgente = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const persona = useSelector(store => store.encuestas.persona);
    const { datos, setOpenPopup, setNotify } = props;

    const noContesta = () => {
        dispatch(noContestoAccion(1));
        setNotify({ isOpen: true, message: 'El registro se guardó correctamente', type: 'success' })

    }
    //const encuestas = useSelector(store => store.encuestas.array);

    return (
        <Page className={classes.root} title="Encuesta">
            {/*  <Box className={classes.toolbarText}>
                <Toolbar />
            </Box> */}
            <Box m={3} />
            {
                persona.length !== 0 ? (

                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} xs={12}>
                                <PersonaDetalle persona={persona} />
                                <Box m={3} />
                                <Box alignItems="center" display="flex" flexDirection="column" >
                                    <Button
                                        className={classes.botonNo}
                                        variant="contained"
                                        startIcon={<PhoneDisabledIcon />}
                                        size="large"
                                        onClick={() => noContesta()}>
                                        No contestó
                                        </Button>
                                </Box>
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                                <EncuestaDetalle datos={datos} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                            </Grid>
                        </Grid>
                    </Container>

                ) : (

                        <Container>
                            <Paper className={classes.avisoContent}>
                                <IconButton disableRipple className={classes.titleIcon}>
                                    <ErrorOutlineIcon ></ErrorOutlineIcon>
                                </IconButton>
                                <Typography
                                    gutterBottom
                                    variant="h3">
                                    Encuesta Terminada
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h5">
                                    - No hay usuarios -
                                 </Typography>
                            </Paper>
                            <Box mt={3} alignItems="center" display="flex" flexDirection="column" >
                                <Button
                                    startIcon={<CloseIcon />}
                                    variant="contained"
                                    size="large"
                                    onClick={() => setOpenPopup(false)}>
                                    SALIR
                                </Button>
                            </Box>

                        </Container>

                    )

            }





        </Page>
    )
}

export default EncuestaAgente
