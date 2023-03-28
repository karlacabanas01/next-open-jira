// 1.React, 2.Nextjs, 3.Material, 4.componentes 

import { ChangeEvent, useState } from "react";

import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";

import { Layout } from "../../components/layouts";
import { EntryStatus } from "../../interfaces";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage = () => {

    const [inputValue,setInputValue] = useState('');
    const [status,setStatus] = useState<EntryStatus>('pending');
    const [touched,setTouched] = useState(false);

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => { 
            setInputValue(event.target.value );
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => { //Vamos a recibir el evento cuando el radio cambie
        //console.log(event.target.value) //Solo la estoy logeando en consola
        setStatus(event.target.value as EntryStatus); //Le digo que es de tipo Entry status
    }

    const onSave = () => {
        console.log({inputValue});
    }
    
    return(
        <Layout title="... ...">
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2}}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${ inputValue } `}
                            subheader={`Creada hace: ... minutos `}

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
                                onChange={onInputValueChanged}

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
                                startIcon={<SaveOutlined/>}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                            >
                               Save 
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>

            <IconButton sx= {{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'red'  //Se pueden poner los coleres de los temas que tenemos 'text.primary/secondary'
            }}>
                <DeleteOutline/>
            </IconButton>



        </Layout>
    );
};


export default EntryPage;