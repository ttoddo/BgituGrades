



interface PropsInterface{
    topTitle: string;
    botTitle: string;
    className?: string; 
}



export default function FirstTableCell({topTitle = "Дата", botTitle = "ФИОстудента", className = ""}: PropsInterface){
    return (
        <td className={`relative ${className}`}>
            <div className="text-right text-tLight dark:text-tLightD p-[5px]">{topTitle}</div>
            <div className="absolute top-[48%] h-[2px] w-[235px] bg-bgDark dark:bg-bgDarkD rotate-[16deg] translate-x-[-5px]"></div>
            <div className="text-left text-tLight dark:text-tLightD p-[5px]">{botTitle}</div>
        </td>
    )
}