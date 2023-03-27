
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  
    if ( req.nextUrl.pathname.startsWith('/api/entries/') ) {
        const id = req.nextUrl.pathname.replace('/api/entries/','');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");  //para saber si es un mongoId mongo db
        console.log({id}) 
      
     if ( !checkMongoIDRegExp.test(id) ) { // se cumple
         const url = req.nextUrl.clone();
         url.pathname = '/api/bad-request'; //Voy a mi badrequest de page

         url.search = `?message=${ id } is not a valid MongoID`; // ? para empezar query parameters

         return NextResponse.rewrite(url);
     }

    }
    //console.log({req: req.nextUrl.pathname})
   
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
    matcher: [
        // '/api/:path', 
        '/api/entries/:path'
    ]
}