import ButtonSkeleton from "./ButtonSkeleton";
import InputSkeleton from "./InputSkeleton";




export default function TopNavBarSkeleton(){
    return (
       <div className=" ml-34 h-25 mt-13.75 animate-bounce flex justify-between pl-3.75 items-end">
            <div className="flex gap-6.25 items-end">
                <InputSkeleton />
                <InputSkeleton />
            </div> 
            <div className="flex gap-6.25">
                <ButtonSkeleton />
                <ButtonSkeleton />
                <ButtonSkeleton />
            </div>
       </div> 
    )
}