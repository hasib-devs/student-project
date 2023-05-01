import { useData } from "./data/Context";
import { DateTime } from "luxon";

const Summery = () => {
  const { days, data } = useData();
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-break" scope="col">
              ID
            </th>
            <th className="text-break" scope="col">
              Batch
            </th>
            <th className="text-break" scope="col">
              Name
            </th>
            {days.map((day) => (
              <th className="text-nowrap" scope="col" key={day}>
                <p className="mb-0">
                  {DateTime.fromJSDate(new Date(day))
                    .toFormat("LLL d, yyyy")
                    .toUpperCase()}
                </p>
                <p className="mb-0">
                  {DateTime.fromJSDate(new Date(day))
                    .toFormat("EEEE")
                    .toUpperCase()}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.StudentID}>
              <td className="text-nowrap" scope="row">
                {student.StudentID}
              </td>
              <td className="text-nowrap" scope="row">
                {student.batch}
              </td>
              <td>{student.StudentName}</td>

              {days.map((day) => {
                const find = student.attendance.find((d) => {
                  const fd = DateTime.fromJSDate(new Date(day)).toFormat(
                    "dd-MM-yyyy"
                  );

                  return fd == d;
                });
                return (
                  <td key={day}>
                    {find ? (
                      <span className="badge text-success">P</span>
                    ) : (
                      <span className="badge text-danger">A</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summery;
