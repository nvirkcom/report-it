import "./Reports.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import ReportsTable from "../../components/ReportsTable/ReportsTable";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    document.title = "Reports - Report It";

    const fetchReports = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/reports`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setReports(data);
    };
    fetchReports();
  }, []);

  return (
    <>
      <section>
        <h1 className="py-6 text-4xl font-bold">Reports</h1>
      </section>
      <section>
        <ReportsTable reports={reports} />
      </section>
    </>
  );
}

export default Reports;
