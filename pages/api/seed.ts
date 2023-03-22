import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
  message: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

  if(process.env.NODE_ENV === 'production') { //Si esta en produccion no se va a ejecutar
    return res.status(401).json({message: 'No tiene acceso a este servicio'}) 
    //El empoind del seed es delicado por que se purga la base de datos, y yo no la quiero purgar en produccion
  }

  await db.connect();
  //En este espacio se pueden hacer cualquier peticion a la basededatos, lecturas, peticiones, etc.
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  await db.disconnect();

  //Cualquier estado diferente del 200 es porq hubo un error
  res.status(200).json({
     message: 'Preceso realizado correctamente'
    })

}
