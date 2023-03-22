import moongose from 'mongoose';
/*
    0 = disconnected - desconectado
    1 = connected - conectado
    2 = connecting - conectando
    3 = disconnecting - desconectando
*/
const mongooConnection = {
    isConnected: 0
}

export const connect = async() => {
    if (mongooConnection.isConnected) {
        console.log('Ya estabamos conectados');
        return;
    }

    if(moongose.connections.length > 0){
        mongooConnection.isConnected = moongose.connections[0].readyState;

        if(mongooConnection.isConnected === 1 ){
            console.log('usando conection anterior')
        }

        await moongose.disconnect();
    }

    await moongose.connect(process.env.MONGO_URL || '' ) 
    mongooConnection.isConnected = 1;
    console.log('Conectado a mongoDB: ', process.env.MONGO_URL )

}

export const disconnect = async() =>{ 

    if(process.env.NODE_ENV === 'development')return;
    
    if(mongooConnection.isConnected === 0 ) return;

    await moongose.disconnect();
    console.log('Desconectado de mongoDB')
}



