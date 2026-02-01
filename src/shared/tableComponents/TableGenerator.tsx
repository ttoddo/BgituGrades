import { useState } from "react";
import EmptyTableCell from "./EmptyTableCell";
import FirstTableCell from "./FirstTableCell";
import EditableTableCell from "./EditableTableCell";
<<<<<<< HEAD
import StudentModal from "../components/modals/StudentModal";
=======
import StudentModal from "../modals/studentModal";
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722

interface PropsInterface{
    ActualRowAmount?: number;
    ActualColAmount?: number;
    selectData?: string[];
    tableType: "work" | "date";
    isEditMode: boolean;
    table?: Array<JSON>;
    
}


<<<<<<< HEAD
export default function TableGenerator({ActualColAmount = 24, ActualRowAmount = 10, selectData = ["1", "2", "3"], tableType}: PropsInterface){
    const [isOpen, setIsOpen] = useState(false)
    
    const open = (e: MouseEvent<HTMLElement>) => {
        setIsOpen(true);
        console.log(e.target.key)
    }
    
    
    const renderTable = () => {
        const numRows = 15, numCols = 50
        const rows = [];

        for (let i = 0; i < numRows; i++) {
        const cells = [];

        for (let j = 0; j < numCols; j++) {   
            
            if(j == 0){
                if (i == 0) {
                    cells.push(<FirstTableCell topTitle="Дата" botTitle="ФИО студента" className="min-w-[225px] h-[50px]" key={String(i) + " " + String(j)}/>)
                } else {
                    cells.push(<EditableTableCell onClick={(e) => {console.log(e.target.id)}} cellType="student" className="min-w-[225px] h-[50px] text-[16px] font-bold text-tLight dark:text-tLightD" key={String(i) + " " + String(j)} />);
                }
            } else {
                if (i == 0) {
                    cells.push(<EditableTableCell cellType="date" className="min-w-[50px] h-[50px] text-[16px] font-blod text-tLight dark:text-tLightD text-center" key={String(i) + " " + String(j)}/>)
=======
export default function TableGenerator({ActualColAmount = 24, ActualRowAmount = 10, selectData = ["1", "2", "3"], tableType, isEditMode, table}: PropsInterface){
    const [studentModal, setStudentModal] = useState<boolean>(false)

    const openStudentModal = () => {
        setStudentModal(true)
    }
    const closeStudentModal = () => {
        setStudentModal(false)
    }
    const renderTable = (tableIndex:number) => {
        const numRows = 15, numCols = 50
        const rows = [];
        const cells = [];
        if (table?.length > 0) {
            let dates = table[0].presences
            cells.push(<FirstTableCell topTitle="Дата" botTitle="ФИО" className="min-w-[225px] h-[50px]" key={"Allah"}/>)
                    dates.forEach((date, dateIndex) => {
                        cells.push(<EditableTableCell onClick={openStudentModal} cellType="date" cellData={date.date} cellDateType={date.classType == "PRACTICE" ? "Прак" : "Лек"} className="min-w-[50px] h-[50px] p-[5px] text-[16px] font-blod text-tLight dark:text-tLightD" key={"Allah" + String(dateIndex)} />);
                    });
            rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={"allah2"}>{cells}</tr>)
            table.forEach((student, idx) => {
                const cells = [];
                console.log(student, idx)
                let dates = student.presences
                cells.push(<EditableTableCell onClick={openStudentModal} cellType="student" cellData={student.name} className="min-w-[225px] h-[50px] p-[5px] text-[16px] font-blod text-tLight dark:text-tLightD" key={"Allah" + String(idx)} />)
                dates.forEach((date, index) => {
                    cells.push(<EmptyTableCell cellType={tableType} className="min-w-[50px] h-[50px] " key={String(idx) + " " + String(index)} />);
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
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
                } else {
                    cells.push(<EmptyTableCell cellType={tableType} className="min-w-[50px] h-[50px] " key={String(i) + " " + String(j)} />);
                }
            }
        }
            rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={i}>{cells}</tr>);
<<<<<<< HEAD
        }

        return (
        <table className=" block border-separate border-spacing-[2px] border-bgModal max-w-[1600px] max-h-[570px] rounded-[8px] overflow-scroll" key="table">
            <tbody>{rows}</tbody>
        </table>
        );
    };

    return (
        <div>
            <div key={1}>
                <StudentModal  isOpen={isOpen} setIsOpen={setIsOpen} />
                {renderTable()}
=======
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
>>>>>>> 5fef1af7dd9c68d3be57def2bed13dcc1c1f2722
            </div>
        </div>
    );
}