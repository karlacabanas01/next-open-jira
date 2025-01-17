import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts']


export const Sidebar = () => { 
    //Recibe un objeto vacio, para solucionar se puede crear un componente falso

    const { sidemenuOpen, closeSideMenu  } = useContext( UIContext ); //Cerrar y abrir el side menu


    return (
        <Drawer
            anchor="left"
            open={ sidemenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>

                <Box sx={{ padding:'5px 10px' }}>
                    <Typography variant="h4">Menú</Typography>
                </Box>

                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItem button key={ text }>
                                <ListItemIcon>
                                {/*Cambiamos el tipo de icono, si necesitamos mas iconos buscar en la documentacion
                                Si es par se pone un icono y se es impar otro */}
                                
                                    { index % 2 ? <InboxOutlinedIcon />: <MailOutlineOutlinedIcon />  } 
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />


                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItem button key={ text }>
                                <ListItemIcon>
                                    { index % 2 ? <InboxOutlinedIcon />: <MailOutlineOutlinedIcon />  }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ))
                    }
                </List>

            </Box>
            
        </Drawer>
    )
};
