import React, { useState } from 'react'
import {
    Box, Card, CardHeader, Toolbar, Divider,
    InputAdornment, TableBody, TableCell, TableRow, makeStyles, Chip, colors, IconButton
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Controls from 'src/components/controls/Controls';
import Tabla from 'src/components/Tabla';
import { CSVLink } from 'react-csv'
import theme from 'src/theme';



const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    actions: {
        justifyContent: 'flex-end'
    },
    searchInput: {
        width: '50%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),

    },
    chipP: {
        color: '#fff',
        background: colors.green[500] //'#15c12a'
    },
    chipN: {
        color: '#fff',
        background: colors.red[600]
    },
    chipNc: {
        color: '#fff',
        background: colors.orange[600]
    },
    csvButton: {
        position: 'absolute',
        right: '10px'
    }
}));
const headCells = [
    { id: 'completo', label: 'Nombre' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'origen', label: 'Origen' },
    { id: 'aceptacion', label: 'Aceptación', disableSorting: true }
];

const ListaLlamadas = ({ llamadas }) => {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(llamadas, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.completo.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <Card className={classes.root} >
            <CardHeader title="Personas contactadas" />
            <Divider />
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
                <CSVLink data={llamadas} filename={"llamadas.csv"} className={classes.csvButton}>
                    <IconButton color="primary" aria-label="Descargar" >
                        <AssignmentReturnedIcon />
                    </IconButton>
                </CSVLink>

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
                                    <TableCell>{item.completo}</TableCell>
                                    <TableCell>{item.telefono}</TableCell>
                                    <TableCell>{item.origen}</TableCell>
                                    <TableCell>
                                        <Chip
                                            className=
                                            {
                                                item.aceptacion === 'positivo' ? classes.chipP :
                                                    item.aceptacion === 'negativo' ? classes.chipN :
                                                        classes.chipNc
                                            }
                                            label={item.aceptacion}
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
    )
}

export default ListaLlamadas
