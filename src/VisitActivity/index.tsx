import LeftNavBar from "../shared/components/LeftNavBar"
import TableGenerator from "../shared/components/TableGenerator"
import TopNavBar from "../shared/components/TopNavBar"

function VisitActivity() {
    return (
        <div className="w-full h-[calc(100vh-75px)] bg-bgMiddle dark:bg-bgMiddleD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar />
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator ActualColAmount={24} ActualRowAmount={10} selectData={["1", "2", "3"]}/>
                </div>
            </div>
        </div>
    )
}

export default VisitActivity