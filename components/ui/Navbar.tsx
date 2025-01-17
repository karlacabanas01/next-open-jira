import { useContext } from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '../../context/ui';
import Link from 'next/link';

export const Navbar = () => {

  const { openSideMenu } = useContext( UIContext );


  return (
      <AppBar position='sticky'>
          <Toolbar>
              <IconButton 
                size='large'
                edge="start"
                onClick={ openSideMenu }
              >
                  <MenuOutlinedIcon />
              </IconButton>
              <Link
                href="/"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Typography variant="h6">OpenJira</Typography>
              </Link>
          </Toolbar>
      </AppBar>
  )
};
