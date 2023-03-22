// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//No importa si es un post, put o get, todos los metodos pasan por este archivo
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  message: string;
  method: string;
  //secret?: string;
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
  console.log(process.env)
  //Cualquier estado diferente del 200 es porq hubo un error
  res.status(200).json({
     ok: true,
     message: 'Todo correcto',
     method: req.method || 'no hay metodo',
     //secret: process.env.SECRET_KEY
    })

}
