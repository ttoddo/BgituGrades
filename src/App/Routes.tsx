import VisitActivity from '../VisitActivity';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function RoutesManager() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VisitActivity></VisitActivity>}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesManager