import Select from "react-select";
import { useData } from "./data/Context";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DateTime } from "luxon";
import { toast } from "react-toastify";

const Attendance = () => {
  const { data, setData } = useData();
  const [options, setOptions] = useState([]);
  const [activeBatch, setActiveBatch] = useState(null);
  const [value, onChange] = useState(new Date());
  const [activeStudent, setActiveStudent] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const op = [];
    new Set(data.map((student) => student.batch)).forEach((batch) => {
      op.push({ value: batch, label: batch });
    });
    setOptions(op);
  }, []);

  const setPresent = (id) => {
    setData((prev) => {
      const newData = [...prev];
      const findIndex = newData.findIndex(
        (student) => student.StudentID === id
      );
      newData[findIndex].attendance.push(
        DateTime.fromJSDate(value).toFormat("dd-MM-yyyy")
      );
      newData[findIndex].attendance = Array.from(
        new Set(newData[findIndex].attendance)
      );
      return newData;
    });

    toast.success("Attendance Marked");
  };

  const setAbsent = (id) => {
    setData((prev) => {
      const newData = [...prev];
      const findIndex = newData.findIndex(
        (student) => student.StudentID === id
      );
      newData[findIndex].attendance = newData[findIndex].attendance.filter(
        (date) => date !== DateTime.fromJSDate(value).toFormat("dd-MM-yyyy")
      );
      return newData;
    });
    toast.warning("Attendance updated");
  };
  return (
    <div className="p-5 pt-3 m-5 mt-0 vh-100">
      <div className="row">
        <div className="col">
          <Select
            value={activeBatch}
            onChange={(val) => setActiveBatch(val)}
            options={options}
            placeholder="Select Batch"
          />
        </div>
        <div className="col">
          <form>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {activeBatch && (
        <div className="row mt-4">
          <div className="col-md-7">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Batch</th>
                  <th scope="col">Name</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody>
                {data
                  .filter((student) => student.batch === activeBatch?.value)
                  .filter(
                    (student) =>
                      student.StudentName.toLowerCase().includes(
                        searchText.toLowerCase()
                      ) ||
                      student.StudentID.toLowerCase().includes(
                        searchText.toLowerCase()
                      )
                  )
                  .map((student) => (
                    <tr key={student.StudentID}>
                      <td
                        className={`${
                          student.StudentID == activeStudent &&
                          "bg-primary bg-opacity-50"
                        } pointer-event text-nowrap`}
                        onClick={() => setActiveStudent(student.StudentID)}
                      >
                        {student.batch}
                      </td>
                      <td
                        className={`${
                          student.StudentID == activeStudent &&
                          "bg-primary bg-opacity-50"
                        } pointer-event`}
                        onClick={() => setActiveStudent(student.StudentID)}
                      >
                        {student.StudentName}
                      </td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn text-white btn-info"
                            onClick={() => setPresent(student.StudentID)}
                          >
                            Present
                          </button>

                          <button
                            type="button"
                            className="btn btn-warning text-white"
                            onClick={() => setAbsent(student.StudentID)}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-5">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
