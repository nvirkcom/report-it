import "./Create.scss";
import "easymde/dist/easymde.min.css";
import "react-quill/dist/quill.snow.css";
import { FaCaretDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import SimpleMDE from "react-simplemde-editor";

function Create() {
  const [formErrors, setFormErrors] = useState([]);
  const [reportType, setReportType] = useState("Markdown");
  const [showDropdownReportType, setShowDropdownReportType] = useState(false);
  const wysiwyg = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { datetime, markdown, "plain-text": plainText, title } = e.target;

    let errors = [];

    if (!title.value) {
      errors.push({ id: 1, text: "Title is required" });
    }

    if (!datetime.value) {
      errors.push({ id: 2, text: "Date & Time is required" });
    }

    if (!markdown?.value && !plainText?.value && !wysiwyg.current?.value) {
      errors.push({ id: 3, text: "Content is required" });
    }

    setFormErrors(errors);

    if (errors.length === 0) {
      console.log("Submit Form");
    }
  };

  return (
    <section>
      <h1 className="py-6 text-4xl font-bold">Create Report</h1>

      <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium uppercase text-gray-500"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-600 outline-none focus:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
            id="title"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium uppercase text-gray-500"
            htmlFor="datetime"
          >
            Date & Time
          </label>
          <input
            className="appearance-none rounded border border-gray-300 bg-white px-4 py-2 text-gray-600 outline-none focus:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
            id="datetime"
            type="datetime-local"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium uppercase text-gray-500">Type</h2>
          <div className="cursor-pointer">
            <p
              className="flex items-center justify-between rounded border border-gray-300 bg-white px-4 py-2 text-gray-600 outline-none active:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              onClick={() => setShowDropdownReportType(!showDropdownReportType)}
            >
              {reportType}
              <FaCaretDown />
            </p>
            {showDropdownReportType && (
              <ul className="mt-2 w-full rounded border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500">
                <li
                  className="flex items-center justify-between rounded-t border-b border-gray-200 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:border-blue-500"
                  onClick={() => {
                    setReportType("Markdown");
                    setShowDropdownReportType(false);
                  }}
                >
                  Markdown
                  <FaCheck
                    className={`text-green-600${
                      reportType === "Markdown" ? "" : " hidden"
                    }`}
                  />
                </li>
                <li
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:border-blue-500"
                  onClick={() => {
                    setReportType("Plain Text");
                    setShowDropdownReportType(false);
                  }}
                >
                  Plain Text
                  <FaCheck
                    className={`text-green-600${
                      reportType === "Plain Text" ? "" : " hidden"
                    }`}
                  />
                </li>
                <li
                  className="flex items-center justify-between rounded-b px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:border-blue-500"
                  onClick={() => {
                    setReportType("WYSIWYG");
                    setShowDropdownReportType(false);
                  }}
                >
                  WYSIWYG
                  <FaCheck
                    className={`text-green-600${
                      reportType === "WYSIWYG" ? "" : " hidden"
                    }`}
                  />
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium uppercase text-gray-500"
            htmlFor="content"
          >
            Content
          </label>
          {reportType === "Markdown" && (
            <SimpleMDE
              className="rounded border border-gray-300 focus-within:border-blue-400 dark:border-gray-700 dark:text-white dark:focus-within:border-blue-500"
              id="markdown"
              options={{
                status: false,
                styleSelectedText: false,
                toolbar: [
                  "bold",
                  "clean-block",
                  "code",
                  "guide",
                  "heading",
                  "heading-1",
                  "heading-2",
                  "heading-3",
                  "heading-bigger",
                  "heading-smaller",
                  "horizontal-rule",
                  "image",
                  "italic",
                  "link",
                  "ordered-list",
                  "preview",
                  "quote",
                  "strikethrough",
                  "table",
                  "unordered-list",
                ],
              }}
            />
          )}
          {reportType === "Plain Text" && (
            <textarea
              className="min-h-64 resize-none rounded border border-gray-300 bg-white px-4 py-2 text-gray-600 outline-none focus:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              id="plain-text"
            ></textarea>
          )}
          {reportType === "WYSIWYG" && (
            <ReactQuill
              className="rounded border border-gray-300 bg-white focus-within:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-blue-500"
              ref={wysiwyg}
              theme="snow"
            />
          )}
        </div>
        {formErrors.length > 1 && (
          <ul className="list-disc rounded border border-red-600 bg-red-100 px-8 py-4 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-600">
            {formErrors.map((formError) => (
              <li key={formError.id}>{formError.text}</li>
            ))}
          </ul>
        )}
        <input
          className="cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-600 active:bg-blue-700"
          type="submit"
          value="Submit"
        />
      </form>
    </section>
  );
}

export default Create;
