import React, { useState } from 'react'
import {
    Box,
    Card,
    CardHeader,
    Divider,
    TableBody,
    TableCell,
    TableRow,
    makeStyles,
    Avatar,
    Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Tabla from 'src/components/Tabla';
import getInitials from 'src/utils/getInitials';




const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}));
const headCells = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'email', label: 'Cuenta' },
    { id: 'total', label: 'Llamadas' }
];

const ListaAgentes = ({ agentes }) => {
    const classes = useStyles();
    const [filterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = Tabla(agentes, headCells, filterFn);


    return (
        <Card className={classes.root} >
            <CardHeader title="Agentes" />
            <Divider />
            <PerfectScrollbar>
                <Box >
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id} >
                                    <TableCell>
                                        <Box
                                            alignItems="center"
                                            display="flex"
                                        >
                                            <Avatar
                                                className={classes.avatar}
                                                src={item.avatarUrl}
                                            >
                                                {getInitials(item.nombre)}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {item.nombre}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.total}</TableCell>
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

export default ListaAgentes
