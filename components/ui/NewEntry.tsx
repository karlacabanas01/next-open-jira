import { ChangeEvent, useContext, useState } from "react";
import { AddCircleOutline, SaveOutlined } from "@mui/icons-material";

import { Button, TextField, Box} from "@mui/material"
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";


export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const {addNewEntry} = useContext(EntriesContext);
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext);


    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => { 
    //Para saber el tipo de dato poner de tipo number y asi saldran los tipos de eventos que se pueden poner 
        setInputValue(event.target.value );
    }

    const onSave = () => { //Agregar las entradas
        if(inputValue.length === 0 ) return;

        addNewEntry(inputValue);

        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

    return(
        <Box sx={{marginBottom: 2, paddingX: 1}}>
            {
                isAddingEntry ? (
                    <>
                        <TextField 
                            fullWidth
                            sx={{marginTop: 2, marginBottom:1}}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            //Validar error
                            error={inputValue.length <= 0 && touched}
                            value={ inputValue }
                            onChange={onTextFieldChange}
                            onBlur={ () => setTouched (true) }
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant="text"
                                onClick={() => setIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon={ <SaveOutlined />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                )
                :
                (
                    <Button
                        startIcon={ <AddCircleOutline /> }
                        fullWidth
                        variant="outlined"
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Agregar tarea
                    </Button>
                )
            }

        </Box>
    )
}