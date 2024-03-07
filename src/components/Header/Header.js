import React from 'react';
import { AppBar, Toolbar, Box, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position='static' sx={{ bgcolor: '#252f3d' }}>
      <Container maxWidth='lg'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img src={'/logo.png'} alt='Logo' style={{ height: 40, marginLeft: 0 }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
