import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"


const startSignalRConnection = async (connection: HubConnection) => {
    try {
        await connection.start()
    } catch (err) {
        console.log(err)
    }
    
}

const setupSignalRConnection = async (key: string | null) => {
    const connection = new HubConnectionBuilder()
            .withUrl("https://maxim.pamagiti.site/hubs/grade?key=" + key,
                    { withCredentials: false })
            .withAutomaticReconnect()
            .build()
            console.log(key)


    connection.onclose(error => {
        console.log(error)
        startSignalRConnection(connection)
    })
    await startSignalRConnection(connection)
    return connection
}            


export default setupSignalRConnection