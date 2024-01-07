import "./Reports.scss";
import ReportsTable from "../../components/ReportsTable/ReportsTable";

function Reports() {
  return (
    <>
      <section>
        <h1 className="py-6 text-4xl font-bold">Reports</h1>
      </section>
      <section>
        <ReportsTable />
      </section>
    </>
  );
}

export default Reports;
