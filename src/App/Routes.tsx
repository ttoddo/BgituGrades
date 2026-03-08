import VisitActivity from '../VisitActivity';
import TaskActivity from '../TaskActivity';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReportActivity from '../ReportActivity';
import AdminActivity from '../AdminActivity/AdminActivity';


function RoutesManager() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VisitActivity></VisitActivity>}></Route>
                <Route path="/visit" element={<VisitActivity></VisitActivity>}></Route>
                <Route path="/task" element={<TaskActivity></TaskActivity>}></Route>
                <Route path="/report" element={<ReportActivity></ReportActivity>}></Route>
                <Route path="/admin" element={<AdminActivity></AdminActivity>}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesManager