import React from 'react';
import { render, screen, logRoles, prettyDOM } from '@testing-library/react';
import {Navbar} from './Navbar'; //pq no es default


describe('Sidebar', () => {
    it('renders a sidebar', () => {
      const {container} = render(<Navbar />); //debe ser iwal
        //console.log(logRoles(container)) 
      expect(screen.queryByRole('heading', {name: 'OpenJira '})).toBeInTheDocument();
    });
    
  });

  