import "./DeleteModal.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteModal({ id, setReports, setShowDeleteModal }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/reports`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setReports(data);

      setShowDeleteModal(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      navigate("/dashboard");
    }
  };
  return (
    <section className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-between bg-gray-950/75 px-6">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-8 rounded border bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-center font-bold">Are you sure?</p>
        <div className="flex items-center justify-between">
          <button
            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-200 active:bg-transparent dark:border-gray-700 dark:hover:bg-gray-700 dark:active:bg-transparent"
            onClick={() => {
              setShowDeleteModal(false);
              document.body.style.overflow = "auto";
            }}
          >
            Cancel
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-700 dark:hover:bg-red-800 dark:active:bg-red-900"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteModal;
