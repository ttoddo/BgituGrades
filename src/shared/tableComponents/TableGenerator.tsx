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
    const numRows = 10, numCols = 22
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const cells = [];

      for (let j = 0; j < numCols; j++) {   
        
        if(j == 0){
            if (i == 0) {
                cells.push(<FirstTableCell topTitle="sosal" botTitle="da" className="w-[225px] h-[50px] " key={String(i) + " " + String(j)}/>)
            } else {
                cells.push(<EditableTableCell cellType="student" className="w-[225px] h-[50px] " key={String(i) + " " + String(j)} />);
            }
        } else {
            if (i == 0) {
                cells.push(<EditableTableCell cellType="work" className="w-[50px] h-[50px] " key={String(i) + " " + String(j)}/>)
            } else {
                cells.push(<EmptyTableCell cellType={tableType} className="w-[50px] h-[50px] " key={String(i) + " " + String(j)} />);
            }
        }
    }
        rows.push(<tr className="odd:bg-bgLight dark:odd:bg-bgLightD even:bg-bgMiddle dark:even:bg-bgMiddleD" key={i}>{cells}</tr>);
    }

    return (
      <table className="border-separate border-spacing-[2px]" key={tableIndex}>
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