import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Attendance from "./Attendance";
import Summery from "./Summery";
import { useData } from "./data/Context";

function App() {
  const resetData = () => {
    localStorage.removeItem("data");
    window.location.reload();
  };
  const { activeTab, setactiveTab } = useData();
  return (
    <div className="vh-100 vw-100 bg-light">
      <div className="container py-5 bg-white">
        <div className="d-flex justify-content-end">
          <button onClick={resetData} className="btn btn-sm">
            Reest Data
          </button>
        </div>
        <Nav tabs className="mb-3">
          <NavItem>
            <NavLink
              className={`pointer-event ${activeTab == 1 && "active"}`}
              onClick={() => setactiveTab(1)}
            >
              Attendance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`pointer-event ${activeTab == 2 && "active"}`}
              onClick={() => setactiveTab(2)}
            >
              Summery
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <Attendance />
          </TabPane>
          <TabPane tabId={2}>
            <Summery />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default App;
