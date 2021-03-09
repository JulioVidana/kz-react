import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, makeStyles, Container } from '@material-ui/core';
import TotalPadron from './TotalPadron';
import TotaLlamadas from './TotaLlamadas';
import TotalNoContesta from './TotalNoContesta';
import TotalPendientes from './ToralPendientes';
import ListaLllamadas from './ListaLlamadas'
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar'
import ChartAceptacion from './ChartAceptacion'
import ListaAgentes from './ListaAgentes'



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    pageContent: {
        paddingTop: theme.spacing(3)
    }
}));

const suma = (dato) => {
    let acum = {}
    dato.forEach(
        function (i) {
            acum[i] = (acum[i] || 0) + 1;
        }
    )
    return acum
};

const EncuestaDetalle = () => {
    const classes = useStyles();
    const llamadas = useSelector(store => store.encustasGlobal.llamadas)
    const encuesta = useSelector(store => store.encustasGlobal.encuestaActual)
    const noContesto = useSelector(store => store.encustasGlobal.nocontesto)
    const agentes = useSelector(store => store.encustasGlobal.agentes)
    const aceptacion = llamadas.map((item) => item.aceptacion)
    const aceptaResult = suma(aceptacion)



    //console.log({ resultado })
    //console.log(Object.keys(aceptaResult))
    //console.log(Object.values(aceptaResult));
    //console.log(llamadas[0].aceptacion);
    return (
        <Page title="Detalle Encuesta" className={classes.root}>
            <Titulo title={encuesta.nombre} />
            <Container maxWidth={false} className={classes.pageContent}>
                <Grid container spacing={3}>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalPadron total={encuesta.totalPadron} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotaLlamadas total={llamadas.length} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalNoContesta total={noContesto} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalPendientes
                            total={encuesta.totalPadron - (llamadas.length + noContesto)} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xl={9}
                        xs={12}
                    >
                        <ListaAgentes agentes={agentes} />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <ChartAceptacion
                            keys={Object.keys(aceptaResult)}
                            values={Object.values(aceptaResult)} />
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <ListaLllamadas llamadas={llamadas} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}


export default EncuestaDetalle
