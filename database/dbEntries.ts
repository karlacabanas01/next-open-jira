import { isValidObjectId } from "mongoose"
import { json } from "stream/consumers";
import { db } from ".";
import { Entry, IEntry } from "../models";

export const getEntryById = async(id: string): Promise<IEntry | null>  => {
    if(!isValidObjectId(id)) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean(); //lean() se utiliza cuando se trabaja con menos info
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
}