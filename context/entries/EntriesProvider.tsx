import React, { FC, useEffect, useReducer } from 'react';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { Entry } from '../../interfaces';
//import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

//Es mas rapido crear una interface ya que una clase ocupa muchas propiedades que no se usaran

export interface EntriesState { //Este es el estado
    entries : Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries : [
       
    ],
}


interface Props {
children?: React.ReactNode | undefined;
}


export const EntriesProvider:FC<Props>  = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );
    const { enqueueSnackbar } = useSnackbar();
   
    const addNewEntry = async(description: string) => {
         //Agregar una nueva entrada en frontend
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }
        const {data}  = await entriesApi.post<Entry>('/entries', {description}); //la api está en el baseURL, solo fallará si la bd esta apagada
        dispatch({type: '[Entry] Add-Entry', payload: data});
    }
    

    const updateEntry = async ( {_id, description, status}: Entry, showSnackbar = false) => {
        try {
            const {data}  = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status}); //la api está en el baseURL, solo fallará si la bd esta apagada
            dispatch({type: '[Entry] Entry-Update', payload: data});

            //Mostrar Snackbar
            if(showSnackbar){
                enqueueSnackbar('Entrada actualizada', {
                    variant: "success",
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
    
                })
            }
            
        } catch (error) {
            console.log({error})
        }
        
    }


    const refreshEntries = async() =>{
        //Se ejecuta la primer vez que la app es cargada
        const {data} = await entriesApi.get<Entry[]>('/entries');
        //Se importa el entry del lado de la interface ya que estamos en frontend
        //console.log(res);
        dispatch({type: '[Entry] Refresh-Data', payload: data});
    }

    useEffect(() =>{ //Sirve para disparar efectos secundarios
        refreshEntries();
    }, []);

    const deleteEntry = async ( entry: Entry, showSnackbar = false ) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ entry._id }` )
 
            dispatch({
                type: '[Entry] - Entry-Deleted',
                payload: data
            })
 
            if( showSnackbar ) {
                enqueueSnackbar('Entrada borrada correctamente',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }
 
            
 
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <EntriesContext.Provider value={{
           ...state,

           //Methods
           addNewEntry,
           updateEntry,
           deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};