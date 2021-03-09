import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregaRespuesta, cancelarLlamada } from 'src/redux/encuestasUsrDucks';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles,
    Typography,
    Paper,
    FormControlLabel,
    Radio,
    FormControl,
    RadioGroup,
    Select,
    MenuItem
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {},
    pageContent: {
        //margin: theme.spacing(2),
        padding: theme.spacing(2),
        background: '#F2F2F5'
    },
    preguntas: {
        padding: theme.spacing(2),
    },
    statsItem: {
        alignItems: 'center',
        display: 'flex'
    }
}));

const valoresIniciales = {
    aceptacion: 'positivo'
};

const EncuestaDetalle = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { datos, setOpenPopup, setNotify } = props;
    const preguntas = datos.preguntas;
    const [valMulti, setValMulti] = useState('');
    const [valores, setValores] = useState(valoresIniciales);



    const multiChange = e => {
        const { name, value } = e.target
        setValMulti(value);
        setValores({
            ...valores,
            [name]: value
        })
        //console.log(e.target.labelId)
    };

    const manejarCambio = e => {
        const { name, value } = e.target
        setValores({
            ...valores,
            [name]: value
        });
    }
    const enviarForm = e => {
        e.preventDefault()
        setValores(valoresIniciales)
        dispatch(agregaRespuesta(valores));
        setOpenPopup(false);
        setNotify({ isOpen: true, message: 'El registro se guardó correctamente', type: 'success' })

    }

    const cancelar = () => {
        // e.preventDefault()
        dispatch(cancelarLlamada())
            .then(() => { setOpenPopup(false) })
            .catch(err => {
                setNotify({ isOpen: true, message: 'ups! ' + err, type: 'error' })

            })

    }


    return (
        <div>
            <Card>
                <CardHeader
                    title="Guión de Encuesta"
                />
                <Divider />
                <CardContent>
                    <Paper className={classes.pageContent}>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="subtitle1">
                            {datos.guion}
                        </Typography>
                    </Paper>
                </CardContent>
            </Card>
            <Box m={3} />
            <form
                id="formDinamico"
                autoComplete="off"
                noValidate
                className={classes.root}
                onSubmit={enviarForm}>
                <Card>
                    <CardHeader
                        title="Preguntas"
                    />
                    <Divider />
                    <CardContent>
                        {
                            preguntas.map(item => (
                                <div key={item.id} >
                                    <Grid className={classes.preguntas}>
                                        <Typography
                                            color="textPrimary"
                                            gutterBottom
                                            variant="h6">
                                            {item.pregunta}
                                        </Typography>
                                        {

                                            item.tipo === "multiple" ?
                                                <FormControl fullWidth variant="outlined" >
                                                    <Select
                                                        labelId="select"
                                                        name={item.id}
                                                        value={valMulti}
                                                        onChange={multiChange}
                                                    >
                                                        {
                                                            item.multiple.map(x => (
                                                                <MenuItem key={x} value={x}>{x}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                                :
                                                <TextField fullWidth name={item.id} id={item.id}
                                                    variant="outlined" onChange={manejarCambio}
                                                />
                                        }
                                    </Grid>
                                    <Divider variant="middle" />
                                </div>

                            ))
                        }
                    </CardContent>

                    <Divider />

                    <Box display="flex" justifyContent="flex-end" p={2}>
                        <Grid container className={classes.statsItem}>
                            <Grid item>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h5">
                                    Aceptación:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="aceptacion" value={valores.aceptacion} onChange={manejarCambio}>
                                        <FormControlLabel
                                            value="positivo"
                                            control={<Radio />}
                                            label="Positivo"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="negativo"
                                            control={<Radio />}
                                            label="negativo"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="ns"
                                            control={<Radio />}
                                            label="Ns/Nc"
                                            labelPlacement="start"
                                        />
                                    </RadioGroup>
                                </FormControl>

                            </Grid>
                        </Grid>
                    </Box>

                </Card>
                <Box m={3} />
                <Grid container
                    direction="row"
                    spacing={2}
                    justify="flex-end"
                    alignItems="center">
                    <Grid item >
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit" >Guardar</Button>
                    </Grid>
                    <Grid item >
                        <Button
                            variant="contained"
                            onClick={() => cancelar()}
                        >Calcelar</Button>
                    </Grid>
                </Grid>
                <Box alignItems="center" display="flex" flexDirection="column" >
                </Box>
            </form>
        </div>
    )
}

export default EncuestaDetalle
