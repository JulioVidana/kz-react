import React, { useState } from 'react';
import { Card, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import Popup from 'src/components/Poupup';
import TotalApoyos from './TotalApoyos';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        height: '75vh'
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));


const ListaColonias = (props) => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [datosColonia, setdatosColonia] = useState(null);

    const abrirEnPopup = item => {
        setdatosColonia(item);
        //console.log(item);
        setOpenPopup(true);
    }
    return (
        <div>
            <Card>
                <List className={classes.root}>
                    {
                        props.datos.map(colonia => (
                            <ListItem onClick={() => abrirEnPopup(colonia)}
                                button
                                key={colonia._id}>
                                <ListItemText primary={colonia.total} />
                                <ListItemText primary={colonia._id} />
                            </ListItem>

                        ))}
                </List>

            </Card>
            <Popup
                title="Total de Apoyos"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >

                <TotalApoyos datos={datosColonia} />
            </Popup>
        </div>

    )
}

export default ListaColonias
