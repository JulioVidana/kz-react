import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerEncuestasAccion, obtenerPersonaRandom } from 'src/redux/encuestasUsrDucks';
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    InputAdornment,
    Chip,
    Box,
    Container,
    Grid,
    Card,
    SvgIcon,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from 'src/components/Page';
import Tabla from 'src/components/Tabla';
import Controls from 'src/components/controls/Controls';
import { Search as SearchIcon } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Popup from 'src/components/Poupup';
import Encuesta from './Encuesta';
import Notificacion from 'src/components/Notification'
import Titulo from 'src/components/Toolbar'

//import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '50%'
    },
    chipA: {
        color: '#fff',
        background: '#15c12a'
    },
    chipT: {
        color: '#fff',
        background: '#9e9e9e'
    }
}));


const headCells = [
    { id: 'nombre', label: 'Nombre de Campaña' },
    { id: 'mitotal', label: 'Llamadas completadas' },
    { id: 'estatus', label: 'Estatus' }
];

const ContactosView = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const encuestas = useSelector(store => store.encuestas.encuesta);
    const loading = useSelector(store => store.encuestas.loading);
    const [datosEncuesta, setDatosEncuesta] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(encuestas, headCells, filterFn);

    useEffect(() => {

        const fetchData = () => {
            //dispatch(obtenerApoyosAccion())
            dispatch(obtenerEncuestasAccion())
        }
        fetchData()

    }, [dispatch])



    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.nombre.toLowerCase().includes(target.value))
            }
        })
    }

    const abrirEncuesta = item => {
        if (item.estatus === 'activa') {
            setDatosEncuesta(item);
            dispatch(obtenerPersonaRandom(item));
            setOpenPopup(true);
        }
    }

    return (
        <Page
            className={classes.root}
            title="Contactos"
        >
            <Titulo title="Mis campañas" />
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Card>
                        <Box p={2}>
                            <Grid
                                container
                                spacing={2}
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Controls.Input
                                        fullWidth
                                        placeholder="Buscar encuesta"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon
                                                        fontSize="small"
                                                        color="action"
                                                    >
                                                        <SearchIcon />
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleSearch}
                                    />
                                </Grid>
                                <Grid>

                                </Grid>

                            </Grid>
                        </Box>

                        <PerfectScrollbar>
                            <Box >
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item._id} onClick={() => abrirEncuesta(item)}>
                                                <TableCell>{item.nombre}</TableCell>
                                                <TableCell>{item.mitotal}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        className={item.estatus === 'activa' ? classes.chipA : classes.chipT}
                                                        label={item.estatus}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>)
                                            )
                                        }
                                    </TableBody>
                                </TblContainer>
                                <TblPagination />
                            </Box>
                        </PerfectScrollbar>
                    </Card>
                </Box>
            </Container>
            <Popup
                title={datosEncuesta != null ? datosEncuesta.nombre : "Encuesta"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                cierre={true}
                fullWidth={true}>
                {
                    loading ? (
                        <Skeleton variant="rect" width="100%">
                            <div style={{ paddingTop: '70%' }} />
                        </Skeleton>
                    ) : (
                            <Encuesta datos={datosEncuesta} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                        )

                }
            </Popup>
            <Notificacion
                notify={notify}
                setNotify={setNotify}
            />
        </Page>
    )
}

export default ContactosView
