import "./ReportsTable.scss";
import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ReportTable() {
  return (
    <table className="w-full">
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
        {[
          {
            created_at: new Date(),
            id: 1,
            title: "Title 1",
            type: "Markdown",
          },
          {
            created_at: new Date(),
            id: 2,
            title: "Title 2",
            type: "Plain Text",
          },
          {
            created_at: new Date(),
            id: 3,
            title: "Title 3",
            type: "WYSIWYG",
          },
        ].map((report) => (
          <TableRow key={report.id} report={report} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ report }) {
  const [showActions, setShowActions] = useState(false);
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
        {report.created_at.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </td>
      <td className="py-4">
        {report.created_at.toLocaleTimeString("en-CA", {
          hour: "numeric",
          minute: "numeric",
        })}
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
                <button className="rounded-b bg-red-600 px-4 py-1 text-gray-100">
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>
      </td>
    </tr>
  );
}

export default ReportTable;
