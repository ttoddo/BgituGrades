import { useState } from "react";
import EmptyTableCell from "./EmptyTableCell";
import FirstTableCell from "./FirstTableCell";
import TableCell from "./EditableTableCell";

interface PropsInterface{
    ActualRowAmount?: number;
    ActualColAmount?: number;
    selectData?: string[];
    
}


export default function TableGenerator({ActualColAmount = 24, ActualRowAmount = 10, selectData = ["1", "2", "3"]}: PropsInterface){

  const renderTable = (tableIndex:number) => {
    const numRows = 10, numCols = 22
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const cells = [];

      for (let j = 0; j < numCols; j++) {   
        if(j == 0){
            cells.push(<td className="w-[225px] h-[50px] bg-bgModal dark:bg-bgModalD" key={j}>Cell</td>);
        } else {
            cells.push(<td className="w-[50px] h-[50px] bg-bgModal dark:bg-bgModalD" key={j}>Cell</td>);
        }
    }
        console.log(cells)
        rows.push(<tr className="" key={i}>{cells}</tr>);
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