import VisitActivity from '../VisitActivity';
import TaskActivity from '../TaskActivity';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function RoutesManager() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VisitActivity></VisitActivity>}></Route>
                <Route path="/visit" element={<VisitActivity></VisitActivity>}></Route>
                <Route path="/task" element={<TaskActivity></TaskActivity>}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesManager