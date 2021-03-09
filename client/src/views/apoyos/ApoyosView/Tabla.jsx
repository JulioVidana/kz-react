import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerApoyosAccion } from 'src/redux/apoyosDucks'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    TablePagination
} from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';



const Tabla = () => {
    const dispatch = useDispatch()
    const personas = useSelector(store => store.apoyos.array)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, personas.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerApoyosAccion())
        }
        fetchData()

    }, [dispatch])





    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell >Paterno</TableCell>
                            <TableCell >Materno</TableCell>
                            <TableCell >Calle</TableCell>
                            <TableCell >Telefono</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*  {personas.map((row) => (
                            <TableRow
                                hover
                                key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.nombre}
                                </TableCell>
                                <TableCell>{row.aPaterno}</TableCell>
                                <TableCell>{row.aMaterno}</TableCell>
                                <TableCell>{row.calle}</TableCell>
                                <TableCell>{row.telefono}</TableCell>
                            </TableRow>
                        ))}  */}
                        {(rowsPerPage > 0
                            ? personas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : personas
                        ).map((row) => (
                            <TableRow hover key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.nombre}
                                </TableCell>
                                <TableCell>{row.aPaterno}</TableCell>
                                <TableCell>{row.aMaterno}</TableCell>
                                <TableCell>{row.calle}</TableCell>
                                <TableCell>{row.telefono}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={personas.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Tabla
