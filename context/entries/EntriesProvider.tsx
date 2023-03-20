import React, { FC, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';

//Es mas rapido crear una interface ya que una clase ocupa muchas propiedades que no se usaran

export interface EntriesState { //Este es el estado
    entries : Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries : [
        {
            _id: uuidv4(),
            description: 'Pendiente: Hola que tal tal tal tal',
            status: 'pending',
            createdAt: Date.now() 
        },
        {
            _id: uuidv4(),
            description: 'En progreso: Hola que tal tal tal tal',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Finalizado: Hola que tal tal tal tal',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ],
}


interface Props {
children?: React.ReactNode | undefined;
}


export const EntriesProvider:FC<Props>  = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({type: '[Entry] Add-Entry', payload: newEntry});
    }
    
    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] Entry-Update', payload: entry});
    }


    return (
        <EntriesContext.Provider value={{
           ...state,

           //Methods
           addNewEntry,
           updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};