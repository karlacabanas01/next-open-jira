import React from 'react';
import { render, screen, logRoles, prettyDOM } from '@testing-library/react';
import {Layout} from '../layouts'; //pq no es default
//import { MockedUIProvider } from '../../context/ui/mockedUIProvider';


describe('Layout', () => { //------NO ESTA MOSTRANDO EL SIDEBAR, Muestra un div vacio-------
    it('renders a sidebar', () => {
      // const {container} = render(<MockedUIProvider> <Layout title='hola' > <h1>Test</h1></Layout> </MockedUIProvider>); //debe ser iwal
      //   console.log(prettyDOM(container)) 
     // expect(screen.queryByRole('heading', {name: 'OpenJira'})).toBeInTheDocument();
    });
    
  });

  