import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { obtenerEncuestasAccion } from 'src/redux/encuestasGlobalDucks'
import { Container, makeStyles, Grid, Box, Fab } from '@material-ui/core';
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar'
import EncuestaCard from './EncuestaCard'
import AddIcon from '@material-ui/icons/Add'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    pageContent: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    productCard: {
        height: '100%'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const EncuestasView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const encuestas = useSelector(store => store.encustasGlobal.encuestas);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerEncuestasAccion())
        }
        fetchData()

    }, [dispatch])

    const nuevaEncuesta = () => {
        navigate('/app/agregaencuesta', { replace: true });

    }

    return (
        <Page
            className={classes.root}
            title="Encuestas"
        >
            <Titulo title="Encuestas" />
            <Container maxWidth={false} >
                <Box mt={3}>
                    <Grid
                        container
                        spacing={3}
                    >
                        {encuestas.map((encuesta) => (
                            <Grid
                                item
                                key={encuesta._id}
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <EncuestaCard className={classes.productCard} encuesta={encuesta} />
                            </Grid>
                        ))}


                    </Grid>

                </Box>
                <Fab color="primary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={nuevaEncuesta}
                    disabled
                >
                    <AddIcon />
                </Fab>
            </Container>

        </Page>

    )
}

export default EncuestasView
