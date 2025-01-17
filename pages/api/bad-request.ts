// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean;
  message: string | string[];
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    const { message = 'Bad request' } = req.query; //mediante el url del middleware estoy esperando este mensaje


  res.status(400).json({ 
    ok: false,
    message
  });

}