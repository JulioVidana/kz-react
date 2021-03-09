import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { agregarApoyoAccion } from 'src/redux/apoyosDucks'
import {
    Container,
    Grid,
    makeStyles,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Box,
    Button
} from '@material-ui/core';
import Page from 'src/components/Page';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const AgregarApoyo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const classes = useStyles();
    const [Datos, setDatos] = useState({
        nombre: '',
        aPaterno: '',
        aMaterno: '',
        calle: '',
        telefono: ''
    });

    const formuChange = (e) => {
        setDatos({
            ...Datos,
            [e.target.name]: e.target.value
        });
        console.log(Datos)
    };

    const enviarDatos = (e) => {
        e.preventDefault();
        console.log(Datos)
        dispatch(agregarApoyoAccion(Datos))
        navigate('/app/apoyos')
    }

    return (
        <Page
            className={classes.root}
            title="Agregar"
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <form onSubmit={(e) => enviarDatos(e)}>
                            <Card>
                                <CardHeader subheader="Agregar nueva información " title="Datos" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Nombre"
                                                name="nombre"
                                                onChange={formuChange}
                                                required
                                                value={Datos.nombre}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Apellido Paterno"
                                                name="aPaterno"
                                                onChange={formuChange}
                                                required
                                                value={Datos.aPaterno}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Apellido Materno"
                                                name="aMaterno"
                                                onChange={formuChange}
                                                required
                                                value={Datos.aMaterno}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Calle y Número"
                                                name="calle"
                                                onChange={formuChange}
                                                required
                                                value={Datos.calle}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Colonia"
                                                name="colonia"
                                                required
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Número de Teléfono"
                                                name="telefono"
                                                type="number"
                                                variant="outlined"
                                                onChange={formuChange}
                                                value={Datos.telefono}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    p={2}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Agregar
                                    </Button>
                                </Box>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>

        </Page>
    )
}

export default AgregarApoyo
