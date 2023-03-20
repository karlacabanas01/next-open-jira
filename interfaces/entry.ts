//Definicion de la entrada

export interface Entry{
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus; //Para que sea pending, in-process, finished.
}

//Cuando no los voy a expandir pueden ser type
export type EntryStatus = 'pending' | 'in-progress' | 'finished'