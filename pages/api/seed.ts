import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  //Cualquier estado diferente del 200 es porq hubo un error
  res.status(200).json({
     name: 'Example'
    })

}
