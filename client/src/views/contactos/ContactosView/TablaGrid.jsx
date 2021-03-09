import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { obtenerApoyosAccion } from 'src/redux/apoyosDucks'
import { Card, makeStyles, Box } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Popup from 'src/components/Poupup';


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const columnas = [
    { field: 'completo', headerName: 'Nombre', width: 270 },
    { field: 'colonia', headerName: 'Colonia', width: 180 },
    { field: 'calle', headerName: 'Dirección' },
    { field: 'telefono', headerName: 'Teléfono' },
    { field: 'tipoApoyo', headerName: 'Apoyo' },
];

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TablaGrid = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const personas = useSelector(store => store.apoyos.array)
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerApoyosAccion())
        }
        fetchData()

    }, [dispatch])

    //console.log(personas)
    const abrirEnPopup = item => {
        setOpenPopup(true);
        console.log(item);

    }

    return (
        <Card
            className={classes.root}

        >
            <PerfectScrollbar>
                <Box >
                    <div style={{ height: 400, width: '100%' }}>

                        <DataGrid
                            rows={personas} columns={columnas}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            onRowClick={() => abrirEnPopup('param: RowParams')}
                        />
                    </div>
                </Box>

            </PerfectScrollbar>
            <Popup
                title="Datos usuario"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <div>HOLAA</div>
            </Popup>
        </Card>

    )
}

export default TablaGrid
