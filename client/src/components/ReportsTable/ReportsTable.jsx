import "./ReportsTable.scss";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

function ReportTable({ reports, setReports }) {
  return (
    <table className="overflow-x-hidden">
      <thead className="text-left text-xs font-bold uppercase">
        <tr className="border-y dark:border-gray-700">
          <th className="w-1/5 py-2 pl-2">ID</th>
          <th className="w-1/5 py-2">Title</th>
          <th className="w-1/5 py-2">Date</th>
          <th className="w-1/5 py-2">Time</th>
          <th className="w-1/5 py-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <TableRow key={report.id} report={report} setReports={setReports} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ report, setReports }) {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
      <td className="py-4 pl-2">{report.id}.</td>
      <td>
        <Link
          className="text-blue-600 hover:underline dark:text-blue-500"
          to={`/dashboard/reports/${report.id}`}
        >
          {report.title}
        </Link>
      </td>
      <td className="py-4">
        {new Date(Number.parseInt(report.timestamp)).toLocaleDateString(
          "en-CA",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        )}
      </td>
      <td className="py-4">
        {new Date(Number.parseInt(report.timestamp)).toLocaleTimeString(
          "en-CA",
          {
            hour: "numeric",
            minute: "numeric",
          },
        )}
      </td>
      <td className="flex items-center justify-between py-4 pr-1">
        <span
          className={`rounded-full ${
            report.type === "Markdown"
              ? "bg-green-600"
              : report.type === "Plain Text"
                ? "bg-yellow-600"
                : "bg-red-500"
          } min-w-24 px-2 py-1 text-center text-xs uppercase text-gray-100`}
        >
          {report.type}
        </span>
        <div className="relative">
          <button onClick={() => setShowActions(!showActions)}>
            <FaEllipsisVertical />
          </button>
          {showActions && (
            <ul className="absolute right-0 z-50 rounded border border-gray-200 bg-gray-50 text-sm dark:border-gray-700 dark:bg-gray-800">
              <li>
                <Link
                  className="block rounded-t px-4 py-1"
                  to={`/dashboard/reports/${report.id}/edit`}
                >
                  Edit
                </Link>
              </li>
              <li>
                <button
                  className="rounded-b bg-red-600 px-4 py-1 text-gray-100"
                  onClick={() => {
                    setShowActions(false);
                    setShowDeleteModal(true);
                    document.body.style.overflow = "hidden";
                  }}
                >
                  Delete
                </button>
              </li>
            </ul>
          )}
          {showDeleteModal && (
            <DeleteModal
              id={report.id}
              setReports={setReports}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </td>
    </tr>
  );
}

export default ReportTable;
