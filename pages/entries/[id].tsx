// 1.React, 2.Nextjs, 3.Material, 4.componentes 

import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from "../../interfaces";
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';
//import { dateFunctions } from '../../utils';



const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props{
    entry: Entry 
}

export const EntryPage:FC<Props> = ({ entry }) => {
     //siempre tengo esta entry, sino el mismo getServerSideProps me redireccionaria para el home
    
    const router = useRouter();    ///// esto modificado
    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    //console.log({props});

    const [inputValue,setInputValue] = useState( entry.description );
    const [status,setStatus] = useState<EntryStatus>( entry.status );
    const [touched,setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, []) //Para que la validacion no se repita tanto en el codigo

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => { 
            setInputValue(event.target.value );
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => { //Vamos a recibir el evento cuando el radio cambie
        //console.log(event.target.value) //Solo la estoy logeando en consola
        setStatus(event.target.value as EntryStatus); //Le digo que es de tipo Entry status
    }

    const onSave = () => {
        //console.log({inputValue});
        if(inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true);

    }

    const onDelete = () => {    ///// esto modificado
        deleteEntry( entry, true );
        router.push('/')
    }

    
    
    return (
        
        <Layout title={ inputValue.substring(0,20) + '...' }  >
            
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2}}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: `}
                            subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}

                        />
                        <CardContent>
                            <TextField
                                sx={{marginTop: 2, marginBottom: 1}}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onBlur= {() => setTouched(true)} //Si toca el textfield
                                onChange={onInputValueChanged}
                                helperText={ isNotValid && 'Ingrese un valor'}
                                error={isNotValid}

                            />

                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={ onStatusChanged }
                                >
                                    {
                                        validStatus.map( opt => (
                                            <FormControlLabel 
                                                key={opt}
                                                value={opt}
                                                control={ <Radio />}
                                                label={capitalize(opt)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                            {/* RADIO */} 
                                
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                               Save 
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>

            <IconButton 
                onClick={onDelete}
                sx= {{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'red'  //Se pueden poner los coleres de los temas que tenemos 'text.primary/secondary'
                }}
            >
                <DeleteOutline />
            </IconButton>



        </Layout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

//ServerSideProps
//Se debe usar cuando el usuario hace la solicitud, cuando hace el request
//Estamos del lado del servidor
export const getServerSideProps: GetServerSideProps = async ({params}) => { // ctx : context, params viene del ctx està desesctructurado

    //Primero debemos tarer el id de la base de datos
    //console.log(params)
    const {id} = params as {id: string}; //Se tipea solo este pq osinó hay que tipar toda la funcion y es más trabajo
    
    const entry = await dbEntries.getEntryById(id);

    if(!entry) { //Si no tenemos un valor en la entrada hacemos la redireccion
        return{
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: { //Lo que se regrese aqui es lo que se va a aver en las props generales
            entry
        }
    }
}

export default EntryPage;

