import React, { FC, useState } from 'react';
import styles from './Navbar.module.scss';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { LS_PALETTE_MODE_KEY } from '../../App';

interface NavbarProps {
  togglePaletteModeCallback(newPaletteMode: string): void;
}

const Navbar: FC<NavbarProps> = (props) => {
  const [paletteMode, setPaletteMode] = useState(localStorage.getItem(LS_PALETTE_MODE_KEY) || 'light');

  function togglePaletteMode() {
    const newPaletteMode = paletteMode === 'light' ? 'dark' : 'light';

    setPaletteMode(newPaletteMode);
    localStorage.setItem(LS_PALETTE_MODE_KEY, newPaletteMode);
    props.togglePaletteModeCallback(newPaletteMode);
  }

  return (
    <div className={styles.Navbar}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Number sum calculator
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
              onClick={togglePaletteMode}
            >
              {paletteMode === 'light' && <DarkMode />}
              {paletteMode === 'dark' && <LightMode />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
