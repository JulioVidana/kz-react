import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuariosAccion, borraUsuarioAccion } from 'src/redux/usuariosDucks';
import { makeStyles, Paper, TableBody, TableCell, TableRow, InputAdornment, Toolbar, Box, Divider } from '@material-ui/core';
import Page from 'src/components/Page';
import Tabla from 'src/components/Tabla';
import Controls from 'src/components/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Registro from './Registro'
import Popup from 'src/components/Poupup';
import Notificacion from 'src/components/Notification'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Titulo from 'src/components/Toolbar'


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
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}));

const headCells = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'email', label: 'Email' },
    { id: 'rol', label: 'Rol' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];

const UsuariosView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const usuariosList = useSelector(store => store.usuarios.datos);
    //const [usuariosList, SetusuariosList] = useState(usuarios);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })



    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(usuariosList, headCells, filterFn);

    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerUsuariosAccion())
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

    const openInPopup = item => {
        //console.log(item)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(borraUsuarioAccion(item))
        setNotify({
            isOpen: true,
            message: 'Se borró Registro',
            type: 'error'
        })
    }

    return (
        <Page
            className={classes.root}
            title="Usuarios"
        >
            <Titulo title="Usuarios" />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Buscar Usuario"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Agregar"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <Divider />
                <PerfectScrollbar>
                    <Box >
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item._id} >
                                        <TableCell>{item.nombre}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            {
                                                item.rol === 1 ? "Administrador" :
                                                    item.rol === 2 ? "Agente" : "Editor"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => { openInPopup(item) }}>
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Estas seguro de borrar el registro?',
                                                        subTitle: "No podrás deshacer esta acción",
                                                        onConfirm: () => { onDelete(item) }
                                                    })
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />

                    </Box>
                </PerfectScrollbar>


            </Paper>
            <Popup
                title="Formulario de Usuario"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <Registro
                    setOpenPopup={setOpenPopup}
                    setNotify={setNotify}
                    recordForEdit={recordForEdit} />

            </Popup>
            <Notificacion
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </Page>
    )
}

export default UsuariosView
