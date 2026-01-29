



interface PropsInterface{
    topTitle: string;
    botTitle: string;
}



export default function FirstTableCell({topTitle = "Дата", botTitle = "ФИОстудента"}: PropsInterface){
    return (
        <div>
            <div>{topTitle}</div>
            <div></div>
            <div>{botTitle}</div>
        </div>
    )
}