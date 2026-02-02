



interface PropsInterface{
    topTitle: string;
    botTitle: string;
    className?: string; 
}



export default function FirstTableCell({topTitle = "Дата", botTitle = "ФИОстудента", className = ""}: PropsInterface){
    return (
        <td className={`relative ${className}`}>
            <div className="text-right text-tLight dark:text-tLightD p-1.25">{topTitle}</div>
            <div className="absolute top-[48%] h-0.5 w-58.75 bg-bgDark dark:bg-bgDarkD rotate-16 -translate-x-1.25"></div>
            <div className="text-left text-tLight dark:text-tLightD p-1.25">{botTitle}</div>
        </td>
    )
}