import LeftNavBar from "../shared/components/LeftNavBar"
import TopNavBar from "../shared/components/TopNavBar"

function VisitActivity() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-[90%] flex-col gap-[25px]">
                <TopNavBar />
                <div className="flex gap-[25px]">
                    <LeftNavBar />
                    {/* <TableGenerator /> */}
                </div>
            </div>
        </div>
    )
}

export default VisitActivity