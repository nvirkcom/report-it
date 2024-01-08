import "./Dashboard.scss";
import { AiFillFileMarkdown } from "react-icons/ai";
import { MdOutlineWysiwyg } from "react-icons/md";
import { PiTextTFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import ReportsTable from "../../components/ReportsTable/ReportsTable";

function Dashboard({ theme }) {
  const [reports, setReports] = useState([]);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  useEffect(() => {
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

  const optionsBar = {
    animationEnabled: true,
    axisX: {
      labelFontColor:
        theme === "dark" ? "rgb(209, 213, 219)" : "rgb(31, 41, 55)",
      lineColor: "transparent",
      tickThickness: 0,
    },
    axisY: {
      gridColor: theme === "dark" ? "#374151" : "#e5e7eb",
      labelFontColor:
        theme === "dark" ? "rgb(209, 213, 219)" : "rgb(31, 41, 55)",
      lineColor: "transparent",
      tickThickness: 0,
    },
    backgroundColor: "transparent",
    data: [
      {
        dataPoints: [
          {
            color: "#22c55e",
            label: "Markdown",
            y: reports.filter((report) => report.type === "Markdown").length,
          },
          {
            color: "#eab308",
            label: "Plain Text",
            y: reports.filter((report) => report.type === "Plain Text").length,
          },
          {
            color: "#f87171",
            label: "WYSIWYG",
            y: reports.filter((report) => report.type === "WYSIWYG").length,
          },
        ],
        type: "column",
      },
    ],
  };

  const optionsDoughnut = {
    animationEnabled: true,
    backgroundColor: "transparent",
    data: [
      {
        dataPoints: [
          {
            color: "#22c55e",
            name: "Markdown",
            y: reports.filter((report) => report.type === "Markdown").length,
          },
          {
            color: "#eab308",
            name: "Plain Text",
            y: reports.filter((report) => report.type === "Plain Text").length,
          },
          {
            color: "#f87171",
            name: "WYSIWYG",
            y: reports.filter((report) => report.type === "WYSIWYG").length,
          },
        ],
        showInLegend: true,
        type: "doughnut",
      },
    ],
    legend: {
      fontColor: theme === "dark" ? "rgb(209, 213, 219)" : "rgb(31, 41, 55)",
    },
  };

  return (
    <>
      <section>
        <h1 className="pt-6 text-4xl font-bold">Dashboard</h1>
        <p className="pt-1 font-medium text-gray-500">
          Here's what's going on right now
        </p>
      </section>
      <section className="mb-6 mt-12 border-b border-gray-200 pb-6 dark:border-gray-700">
        <ul className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <li className="flex items-center gap-4 text-xl font-medium">
            <AiFillFileMarkdown className="-rotate-12 text-5xl text-green-500" />{" "}
            {`${reports.filter((report) => report.type === "Markdown").length}`}{" "}
            Markdown reports
          </li>
          <li className="flex items-center gap-4 text-xl font-medium">
            <PiTextTFill className="-rotate-12 text-5xl text-yellow-500" />{" "}
            {`${
              reports.filter((report) => report.type === "Plain Text").length
            }`}{" "}
            Plain Text reports
          </li>
          <li className="flex items-center gap-4 text-xl font-medium">
            <MdOutlineWysiwyg className="-rotate-12 text-5xl text-red-400" />{" "}
            {`${reports.filter((report) => report.type === "WYSIWYG").length}`}{" "}
            WYSIWYG reports
          </li>
        </ul>
      </section>
      <section className="mb-12 flex flex-col gap-6 md:flex-row">
        <div className=" rounded border border-gray-200 p-4 md:w-1/2 lg:flex lg:justify-center dark:border-gray-700">
          <div className="w-full lg:w-3/4">
            <CanvasJSChart options={optionsDoughnut} />
          </div>
        </div>
        <div className="rounded border border-gray-200 p-4 md:w-1/2 dark:border-gray-700">
          <div className="w-full grow">
            <CanvasJSChart options={optionsBar} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold">Top Reports</h2>
        <ReportsTable reports={reports} setReports={setReports} />
      </section>
    </>
  );
}

export default Dashboard;
