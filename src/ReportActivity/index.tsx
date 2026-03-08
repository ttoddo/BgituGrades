import { useSearchParams } from "react-router-dom"
import LeftNavBar from "../shared/components/LeftNavBar"
import { useEffect, useState } from "react"
import type {  DisciplineInterface, GroupInterface } from "../shared/types/fromRequests"
import { getDisciplines, getDisciplinesByGroup, getGroups } from "../shared/utils/apiRequests"
import setupSignalRConnection from "../shared/utils/signalRService"
import { HubConnection } from "@microsoft/signalr"
import TableGeneratorSkeleton from "../shared/components/skeletons/TableGeneratorSkeleton"
import TopNavBarSkeleton from "../shared/components/skeletons/TopNavbarSkeleton"
import LeftNavBarSkeleton from "../shared/components/skeletons/LeftNavBarSkeleton"
import StudentTopNavBar from "../shared/components/StudentTopNavBar"
import ReportGenerator from "../shared/tableComponents/ReportGenerator"

export default function ReportActivity() {
    const [searchParams] = useSearchParams()
    //const [isEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [tableIds, setTableIds] = useState<number[]>([])
    const [groups, setGroups] = useState<GroupInterface[]>([])
    const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([])
    const [connection, setConnection] = useState<null | HubConnection>(null)
    //const [table, setTable] = useState<WorkTableSample>()
    //const [isTableReady, setIsTableReady] = useState(false)



    useEffect(() => {
        const establishConnection = async () => {
            const con = await setupSignalRConnection(localStorage.getItem("api_key"))
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

    // if (connection) {
    //     connection.on("ReceiveMarks", (data) => {
    //         setTable(data)
    //         setIsTableReady(true)

    //     })
    // }

    if(isLoading ){
        return (
            <div className="w-full h-[90vh]  duration-75 bg-bgDark dark:bg-bgDarkD scroll-none flex justify-center ">
                <div className="w-[90%] animate-pulse flex flex-col gap-6.25">
                    <TopNavBarSkeleton />
                    <div className="flex gap-6.25">
                        <LeftNavBarSkeleton />
                        <TableGeneratorSkeleton/>
                    </div>
                </div>
            </div>)
    }

    if(/*isTableReady &&*/ connection) {
        return (
            <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
                <div className="w-[90%] flex flex-col gap-6.25">
                    <StudentTopNavBar handleSearch={handleSearch} groups={groups} disciplines={disciplines}/>
                    <div className="flex gap-6.25">
                        <LeftNavBar visitsStatus={false} tasksStatus={false} reportStatus={true} adminStatus={false}/>
                        <ReportGenerator />
                    </div>
                </div>
            </div>
        )
    }

    if(connection){
        return (
            <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
                <div className="w-[90%] flex flex-col gap-6.25">
                    <StudentTopNavBar handleSearch={handleSearch} groups={groups} disciplines={disciplines}/>
                    <div className="flex gap-6.25">
                        <LeftNavBar visitsStatus={false} tasksStatus={false} reportStatus={true} adminStatus={false}/>
                        <ReportGenerator />
                    </div>
                </div>
            </div>
        )
    }
}

