import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';

import { Card, CardActionArea, CardActions, CardContent, List, Paper, Typography } from '@mui/material';

import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils/';


interface Props{
    entry: Entry;
}

export const EntryCart:FC<Props> = ({ entry }) => {

    const {startDragging, endDragging} = useContext(UIContext);

    const router = useRouter();

     const onDragStart = (event: DragEvent) => {
        //console.log(event);//Veo que si toma el elemento que yo quiero
        event.dataTransfer.setData('text', entry._id); //Lo dejo caer en el EntryList

        //modificar el estado para indicar que estoy haciendo el Drag
        startDragging();
     }

     const onDragEnd = () => {
        //Cancelar drag
        endDragging();
     }
     const onClick = () => { // [id]
        router.push(`/entries/${entry._id}`);
     }

    return (
        <Card
            onClick={onClick}
            sx={{marginBottom: 1}}
            //Eventos de drag-drop
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{display:'flex', justifyContent:'end', paddingRight:'2px'}}>
                    <Typography variant='body2'> {dateFunctions.getFormatDistanceToNow(entry.createdAt)} </Typography>
                </CardActions>
            </CardActionArea>
            
        </Card>

    )

}