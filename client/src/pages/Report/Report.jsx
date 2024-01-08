import "./Report.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";

function Report() {
  const [report, setReport] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/reports/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setReport(data);
      } catch (error) {
        navigate("/dashboard");
      }
    };

    fetchReport();
  }, [params.id]);

  return (
    <section className="text-lgf flex flex-col gap-4">
      <p className="mt-8">
        <span className="inline-block min-w-16 font-medium">ID: </span>
        {report.id}
      </p>
      <p>
        <span className="inline-block min-w-16 font-medium">Title: </span>
        {report.title}
      </p>
      <p>
        <span className="inline-block min-w-16 font-medium">Date: </span>
        {new Date(Number.parseInt(report.timestamp)).toLocaleDateString(
          "en-CA",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        )}
      </p>
      <p>
        <span className="inline-block min-w-16 font-medium">Time: </span>
        {new Date(Number.parseInt(report.timestamp)).toLocaleTimeString(
          "en-CA",
          {
            hour: "numeric",
            minute: "numeric",
          },
        )}
      </p>
      <div className="border-t border-gray-300 pt-4 dark:border-gray-700">
        <span className="font-medium">Content: </span>
        {report.type === "Markdown" && (
          <Markdown className="markdown">{report.content}</Markdown>
        )}
        {report.type === "Plain Text" && (
          <span className="mt-8 block whitespace-pre-line" disabled>
            {report.content}
          </span>
        )}
        {report.type === "WYSIWYG" && (
          <span
            className="wysiwyg"
            dangerouslySetInnerHTML={{ __html: report.content }}
          ></span>
        )}
      </div>
    </section>
  );
}

export default Report;
