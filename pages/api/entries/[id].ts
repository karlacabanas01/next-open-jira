import mongoose from "mongoose";
import type { NextApiResponse, NextApiRequest } from "next";
import { db } from "../../../database";
import { Entry, IEntry} from "../../../models";

type Data = 
| { message: string }
| IEntry ;

export default function handler (req:NextApiRequest, res: NextApiResponse<Data>) {

    //console.log(req.query); -> query siempre son string

    const {id} = req.query;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message: 'El ID no es valido ' + id })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        
        case 'GET':
            return getEntry(req, res);
                    
        default:
            return res.status(400).json({message: 'Método no existe ' + req.method})

    }
}

const getEntry = async(req:NextApiRequest, res: NextApiResponse) => {
    
    const {id} = req.query;

    await db.connect();
    const entryInDB = await Entry.findById(id);
    await db.disconnect();

    if(!entryInDB){
        
        return res.status(400).json({message: 'No hay entrada con este ID: ' + id});
    }

    return res.status(200).json( entryInDB );

}

const updateEntry = async(req:NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {id} = req.query;
    await db.connect();

    const entryToUpdate = await Entry.findById(id);
    if(!entryToUpdate){
        await db.disconnect()
        return res.status(400).json({message: 'No hay entrada con este ID: ' + id})

    }

    const { //  Si tenemos la informacion usamos esa, si no la que ya existía
        description =  entryToUpdate.description,
        status      = entryToUpdate.status, 
    } = req.body;

    try {
        //linea 1
        const updateEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        await db.disconnect()
        return res.status(200).json(updateEntry!);
    
    } catch (error: any) {
        console.log({error})
        await db.disconnect()
        res.status(400).json({message: error.errors.status.message})
    }
    //Se puede usar cualquiera de las dos siguientes lineas, son lo mismo
    //linea 2
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();

   

}

