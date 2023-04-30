import Select from "react-select";
import { useData } from "./data/Context";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DateTime } from "luxon";

const Attendance = () => {
  const { data, setData } = useData();
  const [options, setOptions] = useState([]);
  const [activeBatch, setActiveBatch] = useState(null);
  const [value, onChange] = useState(new Date());
  const [activeStudent, setActiveStudent] = useState(null);

  useEffect(() => {
    const op = [];
    new Set(data.map((student) => student.batch)).forEach((batch) => {
      op.push({ value: batch, label: batch });
    });
    setOptions(op);
  }, []);

  const setPresent = (id) => {
    console.log("set present");
    setData((prev) => {
      const newData = [...prev];
      const findIndex = newData.findIndex(
        (student) => student.StudentID === id
      );
      newData[findIndex].attendance.push(
        DateTime.fromJSDate(new Date()).toFormat("dd-MM-yyyy")
      );
      newData[findIndex].attendance = Array.from(
        new Set(newData[findIndex].attendance)
      );
      return newData;
    });
  };

  const setAbsent = (id) => {
    console.log("set absent");
    setData((prev) => {
      const newData = [...prev];
      const findIndex = newData.findIndex(
        (student) => student.StudentID === id
      );
      newData[findIndex].attendance = newData[findIndex].attendance.filter(
        (date) =>
          date !== DateTime.fromJSDate(new Date()).toFormat("dd-MM-yyyy")
      );
      return newData;
    });
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
                  .map((student) => (
                    <tr key={student.StudentID}>
                      <td
                        className={`${
                          student.StudentID == activeStudent &&
                          "bg-primary bg-opacity-50"
                        } pointer-event`}
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
