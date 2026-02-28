import LeftNavBar from "../shared/components/LeftNavBar"
import TableGenerator from "../shared/tableComponents/TableGenerator"
import TopNavBar from "../shared/components/TopNavBar"
import { useEffect, useState } from "react"
import { getGroups, getDisciplines, getDisciplinesByGroup } from "../shared/utils/apiRequests"
import { useSearchParams } from "react-router-dom"
import type { DisciplineInterface, GroupInterface, TableSample } from "../shared/types/fromRequests"
import type { HubConnection } from "@microsoft/signalr"
import setupSignalRConnection from "../shared/utils/signalRService"

function VisitActivity() {
    const [searchParams] = useSearchParams()
    const [isEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<GroupInterface[]>([])
    const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([])
    const [tableIds, setTableIds] = useState<number[]>([])
    const [table, setTable] = useState<TableSample>()
    const [isTableReady, setIsTableReady] = useState(false)

    const [connection, setConnection] = useState<null | HubConnection>(null)

    useEffect(() => {
        const establishConnection = async () => {
                let con = await setupSignalRConnection()
                console.log(con.state)
                setConnection(con)
            }
        if (connection == null) {
            establishConnection()
        }
    }, [])


    useEffect(() => {
        const reloadDisciplines = async () => {
            let res: DisciplineInterface[] | undefined = await getDisciplinesByGroup(tableIds[0])
            if (res) {
                setDisciplines(res)
            }
        }

        const getGroupsAndDisciplines = async () => {
            let respGroups: GroupInterface[] | undefined = await getGroups()
            let respDisciplines: DisciplineInterface[] | undefined = await getDisciplines()
            if (respGroups) {
                setGroups(respGroups)
            }
            if (respDisciplines) {
                setDisciplines(respDisciplines)
            }
            setIsLoading(false)
        }

        if (tableIds.length > 1) {
            reloadDisciplines()   
            connection?.invoke("GetPresenceGrade", {
                disciplineId: tableIds[1],
                groupId: tableIds[0]
            })       
        } else if (tableIds.length > 0) {
           
            reloadDisciplines()
        } else {
            getGroupsAndDisciplines()
        }
        let key = searchParams.get("key")
        if (key) {
            localStorage.setItem("api_key", key)
        }     
    }, [tableIds])

    const handleSearch = () => {
        let groupid = searchParams.get("groupid")
        let disciplineid = searchParams.get("disciplineid")

        if ((groupid != 'null' && disciplineid != 'null') && disciplineid && groupid) {
            setTableIds([Number(groupid), Number(disciplineid)])
        } else if (groupid && groupid != 'null') {
            setTableIds([Number(groupid)])
        }
    }

    if (connection) {
        connection.on("ReceivePresences", (data) => {
            console.log(data)
            setTable(data)
            setIsTableReady(true)
        })
    }


    if (isLoading || connection == null) {
        return (<div>Всё плохо</div>)
    }
    if (isTableReady && connection) {
        return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups}/>
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator table={table} isEditMode={isEditMode} tableType="date" connection={connection}/>
                </div>
            </div>
        </div>
        )
    }
    if (connection) {
    return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups} />
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator isEditMode={isEditMode} tableType="date" connection={connection}/>
                </div>
            </div>
        </div> 
    )}
}

export default VisitActivity