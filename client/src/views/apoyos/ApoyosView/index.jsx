import React from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import EnhancedTable from './Tabla2';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const ApoyosListView = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Apoyos"
        >
            {/*  <Container maxWidth={false}>
                <Toolbar />
                <Box mt={3}>
                    <Tabla />
                </Box>
            </Container> */}
            <Container maxWidth={false}>
                <Toolbar />
                <Box mt={3}>
                    <EnhancedTable />
                </Box>
            </Container>
        </Page>
    );
};

export default ApoyosListView;
