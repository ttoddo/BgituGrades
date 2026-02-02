import type { ReactNode } from "react";


interface PropsInterface{
    children?: ReactNode;
    onClick?: () => void;
}


export default function Button({children = "Кнопка"}: PropsInterface){
    return (
        <button className="bg-primary dark:bg-primaryD text-[14px] text-center align-middle text-tLight dark:text-tLightD font-bold h-10 w-42.5 rounded-lg hover:opacity-75 transition-all duration-300">
            {children}
        </button>
    )
}