//import { useEffect, useState } from "react";
import Logo from '../shared/components/SVG/Logo'
import DarkThemeeSwitcher from '../shared/components/SVG/DarkThemeSwitcher'




interface PropsInterface {
    handleThemeChange: Function
}


function Header({handleThemeChange}: PropsInterface){
    return (
        <div className="bg-bgMiddle dark:bg-bgMiddleD w-full h-25 flex justify-center">
            <div className="w-[90%] fixed flex justify-between items-center ">
                <div className="h-full w-fit flex items-center gap-5">
                    <Logo />
                    <h1 className="text-7xl font-bold dark:text:--color-tlightD">BGITU.GRADES</h1>
                </div>
                <div className="h-fit w-fit">
                    <DarkThemeeSwitcher onClick={handleThemeChange}/>                    
                </div>
            </div>
        </div>
    )
}

export default Header