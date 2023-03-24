import mongoose, {Model, Schema} from "mongoose";
import { Entry } from "../interfaces";
//Cuando lo llama es del lado del servidor
export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: {type: String, require: true},
    createdAt: {type: Number},
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    }
});

//El Entry es el modelo que estoy creando, Si existe el modelo va a ser igual al que ya está creado
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;