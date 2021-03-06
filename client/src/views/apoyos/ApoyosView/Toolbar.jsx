import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    }
}));

const Toolbar = ({ className, ...rest }) => {
    const classes = useStyles();
    //const navigate = useNavigate();

    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box
                display="flex"
                justifyContent="flex-end"
            >
                <Button className={classes.importButton}>
                    Importar
        </Button>
                <Button className={classes.exportButton}>
                    Exportar
        </Button>
                <Button
                    color="primary"
                    variant="contained"
                    component={NavLink}
                    to='/app/agregarapoyo'
                >
                    Agregar Registro
        </Button>
            </Box>
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Box maxWidth={500}>
                            <TextField
                                fullWidth
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
                                placeholder="Buscar persona"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string
};

export default Toolbar;
