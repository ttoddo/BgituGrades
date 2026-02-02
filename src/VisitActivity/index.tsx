import LeftNavBar from "../shared/components/LeftNavBar"
import TableGenerator from "../shared/tableComponents/TableGenerator"
import TopNavBar from "../shared/components/TopNavBar"
import { useEffect, useState } from "react"
import { getGroups, getVisitsTable, getDisciplines, getDisciplinesByGroup } from "../shared/utils/apiRequests"
import { useSearchParams } from "react-router-dom"
import type { DisciplineInterface, GroupInterface, TableSample } from "../shared/types/fromRequests"

function VisitActivity() {
    const [searchParams] = useSearchParams()
    const [isEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<GroupInterface[]>([])
    const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([])
    const [tableIds, setTableIds] = useState<number[]>([])
    const [table, setTable] = useState<TableSample>()
    const [isTableReady, setIsTableReady] = useState(false)

    useEffect(() => {
        const getTable = async () => {
            let res: TableSample | undefined = await getVisitsTable(tableIds[0], tableIds[1])
            if (res) {
                setTable(res)
                setIsTableReady(true)
            }
        }
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
            getTable()
            reloadDisciplines()
        } else if (tableIds.length > 0) {
            reloadDisciplines()
        } else {
            getGroupsAndDisciplines()
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
    if (isLoading) {
        return (<div>Всё плохо</div>)
    }
    if (isTableReady) {
        return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups}/>
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator table={table} isEditMode={isEditMode} tableType="date"/>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups}/>
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator isEditMode={isEditMode} tableType="date"/>
                </div>
            </div>
        </div> 
    )
}

export default VisitActivity