import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Box,
    Divider,
    colors,
    useTheme,
    makeStyles
} from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}));

const ChartAceptacion = ({ keys, values }) => {
    const classes = useStyles();

    const theme = useTheme();

    const datos = {
        datasets: [{
            label: '# of Votes',
            data: values,
            backgroundColor: [
                colors.green[500],
                colors.red[600],
                colors.orange[600]
            ],
            borderWidth: 8,
            borderColor: colors.common.white,
            hoverBorderColor: colors.common.white
        }],
        labels: keys
    }

    const options = {
        cutoutPercentage: 80,
        layout: { padding: 0 },

        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 2,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };
    return (
        <Card className={classes.root}>
            <CardHeader title="Aceptación" />
            <Divider />
            <CardContent>
                <Box
                    height={300}
                    position="relative"
                >

                    <Doughnut
                        data={datos}
                        options={options}

                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default ChartAceptacion
