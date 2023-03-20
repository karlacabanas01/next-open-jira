import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>

      <Grid container spacing={2}>
{/*Se puede crear un componente para los tres pero es más avanzado*/}
        <Grid item xs={12} sm={4} > {/*Para tener 3 columnas */}
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            {/*Extended Style, Poner colores: backgroundColor:'green'*/}
            <CardHeader title="Pendientes " />

              <NewEntry /> {/* Agregar una nueva entrada */} 
              <EntryList status='pending'/> {/* Listado de las entradas */}

          </Card>
        </Grid>

        <Grid item xs={12} sm={4}> 
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En progreso " />
            <EntryList status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}> 
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completada " />
            <EntryList status='finished'/>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default HomePage;
