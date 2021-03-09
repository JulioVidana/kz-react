import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatosMapeoAccion } from 'src/redux/mapaDucks';
import MapaView from './mapa'
import Totales from './Totales'
import {
    Grid,
    Container,
    makeStyles,
    Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import ListaColonias from './ListaColonias';


const Styles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
}));

const Mapa = () => {
    const classes = Styles();
    const dispatch = useDispatch();
    const mapeo = useSelector(store => store.mapeo.array);
    const mapeoTotal = useSelector(store => store.mapeo.total)


    if (mapeo.length !== 0) {
        //console.log(mapeo.length)
        //console.log('Total:', mapeoTotal)
    }

    useEffect(() => {

        const fetchData = () => {
            dispatch(getDatosMapeoAccion())
        }
        fetchData()

    }, [dispatch])


    return (
        <Page className={classes.root} title="Apoyos">
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <Totales total={mapeoTotal} />
                        <Box m={1} />
                        <ListaColonias datos={mapeo} />
                    </Grid>

                    <Grid item lg={9} md={12} xl={9} xs={12}>
                        <MapaView mapeo={mapeo} />
                    </Grid>
                </Grid>


            </Container>
        </Page>
    );
};

export default Mapa;