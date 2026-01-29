



interface PropsInterface{
    topTitle: string;
    botTitle: string;
    className?: string; 
}



export default function FirstTableCell({topTitle = "Дата", botTitle = "ФИОстудента", className = ""}: PropsInterface){
    return (
        <td className={className}>
            <div className="text-right text-tLight dark:text-tLightD ">{topTitle}</div>
            <div></div>
            <div className="text-left text-tLight dark:text-tLightD ">{botTitle}</div>
        </td>
    )
}