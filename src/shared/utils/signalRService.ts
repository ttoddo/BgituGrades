import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import type { TableSample } from "../types/fromRequests"



const startSignalRConnection = async (connection: HubConnection) => {
    try {
        await connection.start()
    } catch (err) {
        console.log(err)
    }
    
}

const setupSignalRConnection = async () => {
    const connection = new HubConnectionBuilder()
            .withUrl("https://maxim.pamagiti.site/hubs/grade?key=5521632f1a2017ee08b29ec8eb9fb2134f6509432020c20e371ce8f46c143493",
                    { withCredentials: false })
            .withAutomaticReconnect()
            .build()

    connection.onclose(error => {
        console.log(error)
        startSignalRConnection(connection)
    })
    await startSignalRConnection(connection)
    return connection
}            


export default setupSignalRConnection