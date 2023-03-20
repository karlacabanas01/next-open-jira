import { Entry } from '../../interfaces';
import { EntriesState } from './';

//En el reducer no se ejecuta codigo de terceros
type EntriesActionType = 
 | { type: '[Entry] Add-Entry', payload:  Entry } 
 | { type: '[Entry] Entry-Update', payload:  Entry } 



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

  default:
   return state;

 }

}