import { useState } from "react";
import EmptyTableCell from "./EmptyTableCell";
import FirstTableCell from "./FirstTableCell";
import EditableTableCell from "./EditableTableCell";
import StudentModal from "../modals/StudentModal";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useSearchParams } from "react-router-dom";

interface PropsInterface{
    ActualRowAmount?: number;
    ActualColAmount?: number;
    selectData?: string[];
    tableType: "work" | "date";
    isEditMode: boolean;
    table?: Array<JSON>;
    
}


export default function TableGenerator({ActualColAmount = 24, ActualRowAmount = 10, selectData = ["1", "2", "3"], tableType, isEditMode, table}: PropsInterface){
    const [studentModal, setStudentModal] = useState<boolean>(false)
    const [searchParams] = useSearchParams()

    const connection = new HubConnectionBuilder()
        .withUrl("https://maxim.pamagiti.site/hubs/grade", { withCredentials: false })
        .build()

    connection.start()
        .then(() => console.log("Подключились к сигналу"))
        .catch(err => console.log("Не подключились к сигналу:", err))

    connection.on("ReceivePresence", (data) => console.log(data))

    const openStudentModal = () => {
        setStudentModal(true)
    }
    const closeStudentModal = () => {
        setStudentModal(false)
    }
    const changePresenceState = (presenceState: string, studentId: number, classId: number, date: string) => {
        connection.invoke("UpdatePresenceGrade", { 
            studentId,
            classId,
            date,
            isPresent: presenceState,
            disciplineId: Number(searchParams.get('disciplineid'))
        })
    }
    const renderTable = (tableIndex:number) => {
        const numRows = 14, numCols = 50
        const rows = [];
        const cells = [];
        if (table && table?.length > 0) {
            let dates = table[0].presences
            cells.push(<FirstTableCell topTitle="Дата" botTitle="ФИО" className="min-w-[225px] h-[50px]" key={"Allah"}/>)
                    dates.forEach((date, dateIndex) => {
                        cells.push(<EditableTableCell onClick={openStudentModal} cellType="date" cellData={date.date} cellDateType={date.classType == "PRACTICE" ? "Прак" : "Лек"} className="min-w-[50px] h-[50px] p-[5px] text-[16px] font-blod text-tLight dark:text-tLightD" key={"Allah" + String(dateIndex)} />);
                    });
            rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={"allah2"}>{cells}</tr>)
            table.forEach((student, idx: number) => {
                const cells = [];
                let dates = student.presences
                cells.push(<EditableTableCell onClick={openStudentModal} cellType="student" cellData={student.name} className="min-w-[225px] h-[50px] p-[5px] text-[16px] font-blod text-tLight dark:text-tLightD" key={"Allah" + String(idx)} />)
                dates.forEach((date: JSON, index: number) => {
                    cells.push(<EmptyTableCell connection={connection} changePresenceState={changePresenceState} cellType={tableType} presence={date.isPresent} studentId={student.studentId} date={date.date} classId={date.classId} className="min-w-[50px] h-[50px] " key={String(idx) + " " + String(index)} />);
                });
            
                rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={idx}>{cells}</tr>)
            })
        }
        ;

        /*for (let i = 0; i < numRows; i++) {
        const cells = [];
        
        

        for (let j = 0; j < numCols; j++) {   
        
            if(j == 0){
                if (i == 0) {
                    cells.push(<FirstTableCell topTitle="Дата" botTitle="ФИО" className="min-w-[225px] h-[50px]" key={String(i) + " " + String(j)}/>)
                } else {
                    cells.push(<EditableTableCell onClick={openStudentModal} cellType="student" className="min-w-[225px] h-[50px] p-[5px] text-[16px] font-blod text-tLight dark:text-tLightD" key={String(i) + " " + String(j)} />);
                }
            } else {
                if (i == 0) {
                    cells.push(<EditableTableCell cellType={tableType} className="min-w-[50px] h-[50px] text-[16px] font-blod text-tLight dark:text-tLightD text-center" key={String(i) + " " + String(j)}/>)
                } else {
                    cells.push(<EmptyTableCell cellType={tableType} className="min-w-[50px] h-[50px] " key={String(i) + " " + String(j)} />);
                }
            }
        }
            rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={i}>{cells}</tr>);
        }  */ 

        return (
        <table className=" block border-separate border-spacing-[2px] border-bgModal max-w-[1600px] max-h-[570px] rounded-[8px] overflow-scroll" key={tableIndex}>
            <tbody>{rows}</tbody>
        </table>
        );
  };

    return (
        <div>
            <div key={1}>
                {renderTable(1)}
                <StudentModal isOpen={studentModal} close={closeStudentModal} isEditMode={isEditMode}/>
            </div>
        </div>
    );
}