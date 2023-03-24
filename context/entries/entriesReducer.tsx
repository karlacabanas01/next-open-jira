import { Entry } from '../../interfaces';
import { EntriesState } from './';

//En el reducer no se ejecuta codigo de terceros
type EntriesActionType = 
 | { type: '[Entry] Add-Entry', payload:  Entry } 
 | { type: '[Entry] Entry-Update', payload:  Entry } 
 | { type: '[Entry] Refresh-Data', payload:  Entry[] } //Manda a llamar la base de datos



export const entriesReducer = ( state:EntriesState, action: EntriesActionType): EntriesState => {

 switch (action.type) {

  case '[Entry] Add-Entry':
    return {
     ...state,
     entries: [ ...state.entries, action.payload ]
    }
  
  case '[Entry] Entry-Update':
    return{
      ...state,
      entries: state.entries.map( entry => { //Regreso los elementos en un nuevo arreglo
        if(entry._id === action.payload._id){
          entry.status = action.payload.status;
          entry.description = action.payload.description;
        }
        return entry;
      })
    }
  case '[Entry] Refresh-Data':
    return{
      ...state,
      entries: [...action.payload] //me creo un nuevo arreglo con el valor del payload
    }

  default:
   return state;

 }

}