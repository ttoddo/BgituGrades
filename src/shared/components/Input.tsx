import Arrow from "./SVG/Arrow"


interface PropsInterface{
    textChildren?: string;
    helpText?: string;
}


export default function Input({textChildren="Группа", helpText="Название группы"}: PropsInterface){
    return(
        <div className="flex flex-col gap-[10px]">
            <p className="text-[28px] font-bold text-tLight dark:text-tLightD">{textChildren}</p>
            <div className="relative">
                <input type="text" className="w-[250px] bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-[8px] p-[10px] " placeholder={helpText}/>
                <Arrow className="h-[24px] w-[24px] absolute top-[10px] right-[10px]"/>
            </div>
        </div>
    )
}