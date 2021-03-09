import React, { useState } from 'react';
import {
    Container, makeStyles, Grid, Box, Card, FormControl, InputLabel, Select, MenuItem, Input,
    Divider, CardContent, TextField, Button, Typography, Checkbox, ListItemText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Controls from 'src/components/controls/Controls';
import Page from 'src/components/Page';
import Titulo from 'src/components/Toolbar'
import * as Yup from 'yup';
import { Formik } from 'formik';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    preguntas: {
        marginTop: theme.spacing(3)
        //right: '10px'
    }
}));

const initialFValues = {
    nombre: '',
    guion: '',
    activo: true,
    msg: null,
    origen: []
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const roles = [
    {
        value: 1,
        label: 'Administrador'
    },
    {
        value: 2,
        label: 'Agente'
    },
    {
        value: 3,
        label: 'Editor'
    }
];

const origenes = ['TODO', 'ATENCION CIUDADANA', 'CREE', 'DISCAPACIDAD'];

const AgregaEncuesta = () => {
    const classes = useStyles();
    const [values] = useState(initialFValues);
    const [editar] = useState(false);
    const [origen, setOrigen] = useState([]);

    const handleChange2 = (event) => {
        setOrigen(event.target.value)
        //console.log('pedo', event.target.value)
    }
    return (
        <Page
            className={classes.root}
            title="Agregar Encuestas"
        >
            <Titulo title="Agregar Encuesta" />
            <Container maxWidth='lg'>
                <Box mt={3}>
                    <Grid
                        container
                        spacing={3}>
                        <Grid
                            item
                            xs={12}
                        >
                            <Card>

                                <CardContent>

                                    <Formik
                                        enableReinitialize={editar}
                                        initialValues={values}
                                        validationSchema={
                                            Yup.object().shape({
                                                nombre: Yup.string().max(255).min(6, 'Mínimo 6 caracteres').required('Falta Nombre'),
                                                guion: Yup.string().max(255).min(6, 'Mínimo 6 caracteres').required('Falta Guión')
                                            })
                                        }
                                        onSubmit={(values) => {
                                            console.log('agregar valores', values)
                                        }}

                                    >
                                        {({
                                            errors,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            isSubmitting,
                                            touched,
                                            values
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <Typography variant='h5' gutterBottom margin='normal' >
                                                    Datos Generales
                                                    </Typography>
                                                <Divider />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={Boolean(touched.nombre && errors.nombre)}
                                                            fullWidth
                                                            helperText={touched.nombre && errors.nombre}
                                                            label="Nombre de Encuesta"
                                                            margin="normal"
                                                            name="nombre"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.nombre}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={Boolean(touched.guion && errors.guion)}
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            helperText={touched.guion && errors.guion}
                                                            label="Guión"
                                                            margin="normal"
                                                            name="guion"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.guion}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} lg={6} md={6}>
                                                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                                            <InputLabel id="demo-mutiple-checkbox-label">Origen</InputLabel>
                                                            <Select
                                                                labelId="demo-mutiple-checkbox-label"
                                                                id="demo-mutiple-checkbox"
                                                                multiple
                                                                value={origen}
                                                                onChange={handleChange2}
                                                                input={<Input />}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {origenes.map((orig) => (
                                                                    <MenuItem key={orig} value={orig}>
                                                                        <Checkbox checked={origen.indexOf(orig) > -1} />
                                                                        <ListItemText primary={orig} />
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        {/*   <TextField
                                                                fullWidth
                                                                label="Origen"
                                                                margin="normal"
                                                                name="rol"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                select
                                                                SelectProps={{ native: true }}
                                                                value={values.rol}
                                                                variant="outlined"
                                                            >
                                                                {origen.map((option) => (
                                                                    <option
                                                                        key={option.value}
                                                                        value={option.value}
                                                                    >
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField> */}

                                                    </Grid>
                                                    <Grid item xs={12} lg={6} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Colonia"
                                                            margin="normal"
                                                            name="rol"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            select
                                                            SelectProps={{ native: true }}
                                                            value={values.rol}
                                                            variant="outlined"
                                                        >
                                                            {roles.map((option) => (
                                                                <option
                                                                    key={option.value}
                                                                    value={option.value}
                                                                >
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                    </Grid>

                                                </Grid>
                                                <Typography variant='h5' gutterBottom margin='normal' className={classes.preguntas}>
                                                    Preguntas
                                                    </Typography>
                                                <Divider />
                                                <Box mt={2}>
                                                    <Controls.Button
                                                        text="Respuesta Opción Múltiple"
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}

                                                    />
                                                    <Controls.Button
                                                        text="Respuesta Texto"
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}

                                                    />
                                                    <Controls.Button
                                                        text="Respuesta Número"
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}

                                                    />

                                                </Box>

                                                <Grid container>
                                                    <Grid item xs={12} lg={2} md={2}>
                                                        <Box my={4}>
                                                            <Button
                                                                color="primary"
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                            >
                                                                {editar ? "Actualizar" : "Agregar"}
                                                            </Button>
                                                        </Box>

                                                    </Grid>

                                                </Grid>
                                            </form>


                                        )}

                                    </Formik>


                                </CardContent>
                            </Card>

                        </Grid>

                    </Grid>

                </Box>

            </Container>

        </Page>
    )
}

export default AgregaEncuesta
