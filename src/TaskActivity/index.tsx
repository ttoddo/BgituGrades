import LeftNavBar from "../shared/components/LeftNavBar"
import TopNavBar from "../shared/components/TopNavBar"

export default function TaskActivity() {
    return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar />
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={false} tasksStatus={true}/>
                    {/* <TableGenerator /> */}
                </div>
            </div>
        </div>
    )
}

