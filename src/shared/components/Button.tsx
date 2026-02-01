import type { ReactNode } from "react";


interface PropsInterface{
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
}


export default function Button({children = "Кнопка", onClick = () => {console.log("tiknuli")}, className = "bg-primary dark:bg-primaryD text-[14px] text-center align-middle text-tLight dark:text-tLightD font-bold h-[40px] w-[170px] rounded-[8px] hover:opacity-75 transition-all duration-300"}: PropsInterface){
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}