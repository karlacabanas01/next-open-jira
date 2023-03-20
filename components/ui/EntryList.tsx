import { Opacity } from '@mui/icons-material';
import { List, Paper, useStepContext } from '@mui/material';
import React, { DragEvent, FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryStatus } from '../../interfaces';
import { EntryCart } from './EntryCard';

import style from './EntryList.module.css';

interface Props {
    status: EntryStatus
}

export const EntryList:FC<Props> = ({status}) => { //Recibe 3 estados

    const {entries, updateEntry} = useContext(EntriesContext);
    const {isDragging, endDragging} = useContext(UIContext);
    //Si tiene muchas entradas, para esto usaremos el useMemo, es dificil al principio
    const entriesByStatus = useMemo(() =>  entries.filter(entry => entry.status === status) ,[entries]);

    const allowDrop = (event: DragEvent<HTMLDivElement>) =>{ 
        event.preventDefault();
    }

    const onDropEntry= (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        //console.log({id});
        const entry = entries.find(e => e._id === id)!; //Puede encontrar o no una entrada, nunca falla por eso el signo de !
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }


    return (
     <div
        onDrop={onDropEntry}
        onDragOver={allowDrop}
        className={isDragging ? style.dragging : ''}
     >
        <Paper sx={{ height: 'calc(100vh - 180px )', backgroundColor: 'transparent', padding: '2px 3px' }}>
            <List sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}> 
            {/*Cambiará dependiendo si esto haciendo drag o no,  overflow: 'scroll' */}
                {/*Tiene que ser un texto generado dinamicamente */}
                {
                    entriesByStatus.map( entry => (
                        <EntryCart key={entry._id} entry={entry} />
                    ))
                }
                

            </List>
        </Paper>
     </div>
    )

}