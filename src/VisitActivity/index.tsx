import LeftNavBar from "../shared/components/LeftNavBar"
import TableGenerator from "../shared/tableComponents/TableGenerator"
import TopNavBar from "../shared/components/TopNavBar"
import { useEffect, useState } from "react"
import { getGroups, getVisitsTable, getDisciplines } from "../shared/utils/apiRequests"
import { useSearchParams } from "react-router-dom"

function VisitActivity() {
    const [searchParams] = useSearchParams()
    const [isEditMode, setIsEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<Array<JSON>>([])
    const [disciplines, setDisciplines] = useState<Array<JSON>>([])
    const [tableIds, setTableIds] = useState<number[]>()
    const [table, setTable] = useState<Array<JSON>>([])
    const [isTableReady, setIsTableReady] = useState(false)

    useEffect(() => {
        const getTable = async () => {
            let res:JSON | undefined = await getVisitsTable(tableIds[0], tableIds[1])
            console.log(res)
            if (res) {
                setTable(res.data)
                console.log(res.data)
                setIsTableReady(true)
            }
        }
        const getGroupsAndDisciplines = async () => {
            let respGroups:JSON | undefined = await getGroups()
            let respDisciplines:JSON | undefined = await getDisciplines()
            if (respGroups) {
                setGroups(respGroups.data)
            }
            if (respDisciplines) {
                setDisciplines(respDisciplines.data)
            }
            setIsLoading(false)
        }
        if (tableIds) {
            getTable()
        }
        getGroupsAndDisciplines()

    }, [tableIds])

    const handleSearch = () => {
        let groupid = searchParams.get("groupid")
        let disciplineid = searchParams.get("disciplineid")
        if ((groupid != 'null' && disciplineid != 'null') && disciplineid && groupid) {
            setTableIds([Number(groupid), Number(disciplineid)])
        }
    }
    if (isLoading) {
        return (<div>Глотай сперму</div>)
    }
    if (isTableReady) {
        return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups}/>
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator table={table} isEditMode={isEditMode} tableType="date" ActualColAmount={24} ActualRowAmount={10} selectData={["1", "2", "3"]}/>
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
                    <TableGenerator table={[]} isEditMode={isEditMode} tableType="date" ActualColAmount={24} ActualRowAmount={10} selectData={["1", "2", "3"]}/>
                </div>
            </div>
        </div> 
    )
}

export default VisitActivity