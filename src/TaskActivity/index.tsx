import { useSearchParams } from "react-router-dom"
import LeftNavBar from "../shared/components/LeftNavBar"
import TopNavBar from "../shared/components/TopNavBar"
import TableGenerator from "../shared/tableComponents/TableGenerator"
import { useEffect, useState } from "react"
import type { TableSample, DisciplineInterface, GroupInterface } from "../shared/types/fromRequests"
import { getDisciplines, getDisciplinesByGroup, getGroups } from "../shared/utils/apiRequests"
import setupSignalRConnection from "../shared/utils/signalRService"
import { HubConnection } from "@microsoft/signalr"

export default function TaskActivity() {
    const [searchParams] = useSearchParams()
    const [isEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [tableIds, setTableIds] = useState<number[]>([])
    const [groups, setGroups] = useState<GroupInterface[]>([])
    const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([])
    const [connection, setConnection] = useState<null | HubConnection>(null)
    const [table, setTable] = useState<TableSample>()
    const [isTableReady, setIsTableReady] = useState(false)



    useEffect(() => {
        const establishConnection = async () => {
            const con = await setupSignalRConnection()
            console.log(con.state)

            setConnection(con)
        }
        if(connection == null) {
            establishConnection()
        }
    }, [connection])


    useEffect(() => {
        const reloadDisciplines = async () => {
            const res: DisciplineInterface[] | undefined = await getDisciplinesByGroup(tableIds[0])
            if(res) {
                setDisciplines(res)
            }
        }


        const getGroupsAndDisciplines = async () => {
            const respGroups: GroupInterface[] | undefined = await getGroups()
            const respDisciplines: DisciplineInterface[] | undefined = await getDisciplines()
            if(respGroups){
                setGroups(respGroups)
            }
            if(respDisciplines) {
                setDisciplines(respDisciplines)
            }
            setIsLoading(false)
        }


        if(tableIds.length > 1){
            reloadDisciplines()
            connection?.invoke("GetMarkGrade", {
                disciplineId: tableIds[1],
                groupId: tableIds[0]
            })
        } else if (tableIds.length == 1){
            console.log(tableIds)
            reloadDisciplines()
        } else if (tableIds.length == 0) {
            getGroupsAndDisciplines()

        }
        const key = searchParams.get("key")
        if(key) {
            localStorage.setItem("api_key", key)
        }

        getGroupsAndDisciplines()
    }, [connection, searchParams, tableIds])





    const handleSearch = () => {
        const groupid = searchParams.get("groupid")
        const disciplineid = searchParams.get("disciplineid")

        if((groupid != 'null' && disciplineid != 'null') && disciplineid && groupid){
            setTableIds([Number(groupid), Number(disciplineid)])
        } else if (groupid && groupid != 'null'){
            setTableIds([Number(groupid)])
        }

    }


    if (connection) {
        connection.on("ReceiveMarks", (data) => {
            setTable(data)
            setIsTableReady(true)
        })
    }
    if(isLoading || connection == null){
        return (<div>Skeleton</div>)
    }

    if(isTableReady && connection) {
        return (
            <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
                <div className="w-[90%] flex flex-col gap-6.25">
                    <TopNavBar handleSearch={handleSearch} groups={groups} disciplines={disciplines}/>
                    <div className="flex gap-6.25">
                        <LeftNavBar visitsStatus={false} tasksStatus={true}/>
                        <TableGenerator table={table} isEditMode={isEditMode} tableType="work" connection={connection}/>
                    </div>
                </div>
            </div>
        )
    }

    if(connection){
        return (
            <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
                <div className="w-[90%] flex flex-col gap-6.25">
                    <TopNavBar handleSearch={handleSearch} groups={groups} disciplines={disciplines}/>
                    <div className="flex gap-6.25">
                        <LeftNavBar visitsStatus={false} tasksStatus={true}/>
                        <TableGenerator isEditMode={isEditMode} tableType="work" connection={connection}/>
                    </div>
                </div>
            </div>
        )
    }
}

