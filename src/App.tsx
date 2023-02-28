import {
    Box,
    Card,
    Container,
    CssBaseline,
    Grid,
    PaletteMode,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';

export const LS_PALETTE_MODE_KEY = 'paletteMode';

function App() {
    const [numbers, setNumbers] = useState('');
    const [total, setTotal] = useState(0);
    const [theme, setTheme] = useState(getTheme());

    function getCurrentPaletteMode() {
        return (
            localStorage.getItem(LS_PALETTE_MODE_KEY) ||
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        );
    }

    function getTheme(paletteMode: string = getCurrentPaletteMode()) {
        return createTheme({
            palette: {
                mode: paletteMode as PaletteMode
            }
        });
    }

    function updatePaletteMode(newPaletteMode: string) {
        setTheme(getTheme(newPaletteMode));
    }

    useEffect(() => {
        const numbersToSum = numbers
            .split('\n')
            .map((n) => n.trim())
            .filter((n) => n !== '')
            .map((n) => n.split(',').join('.'))
            .map((n) => n.replace(/[^0-9.]/, '').trim())
            .map((n) => parseFloat(n))
            .filter((n) => !isNaN(n));
        let sum = 0;
        let decimals = 0;
        numbersToSum.forEach((n) => {
            const currDecimals = (n.toString().split('.')[1] || '').length;
            sum += n;
            decimals = currDecimals > decimals ? currDecimals : decimals;
        });

        decimals = 10 ** decimals;

        setTotal(Math.round((sum + Number.EPSILON) * decimals) / decimals);
    }, [numbers]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <Navbar togglePaletteModeCallback={updatePaletteMode} />

                <Container maxWidth='lg' sx={{py: 2}}>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                label='List of numbers'
                                helperText='Add one number per line'
                                variant='outlined'
                                multiline
                                sx={{width: 1}}
                                defaultValue={numbers}
                                onChange={(event) => setNumbers(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Card
                                sx={{
                                    p: 2
                                }}
                            >
                                <Typography component='h2' variant='h6' color='primary' gutterBottom>
                                    Total
                                </Typography>
                                <Typography component='p' variant='h4'>
                                    {total}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
