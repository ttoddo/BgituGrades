import { useState } from "react";
import EmptyTableCell from "./EmptyTableCell";
import FirstTableCell from "./FirstTableCell";
import TableCell from "./EditableTableCell";
import EditableTableCell from "./EditableTableCell";

interface PropsInterface{
    ActualRowAmount?: number;
    ActualColAmount?: number;
    selectData?: string[];
    tableType: "work" | "date";
    
}


export default function TableGenerator({ActualColAmount = 24, ActualRowAmount = 10, selectData = ["1", "2", "3"], tableType}: PropsInterface){

  const renderTable = (tableIndex:number) => {
    const numRows = 15, numCols = 50
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const cells = [];

      for (let j = 0; j < numCols; j++) {   
        
        if(j == 0){
            if (i == 0) {
                cells.push(<FirstTableCell topTitle="Дата" botTitle="ФИО студента" className="min-w-[225px] h-[50px]" key={String(i) + " " + String(j)}/>)
            } else {
                cells.push(<EditableTableCell cellType="student" className="min-w-[225px] h-[50px] p-[5px] text-[16px] font-blod text-tLight dark:text-tLightD" key={String(i) + " " + String(j)} />);
            }
        } else {
            if (i == 0) {
                cells.push(<EditableTableCell cellType="date" className="min-w-[50px] h-[50px] text-[16px] font-blod text-tLight dark:text-tLightD text-center" key={String(i) + " " + String(j)}/>)
            } else {
                cells.push(<EmptyTableCell cellType={tableType} className="min-w-[50px] h-[50px] " key={String(i) + " " + String(j)} />);
            }
        }
    }
        rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={i}>{cells}</tr>);
    }

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
        </div>
    </div>
  );
}