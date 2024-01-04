import Navigation from "../../components/Navigation/Navigation";
import "./Dashboard.scss";

function Dashboard({ handleTheme, theme }) {
  return (
    <div className="flex min-h-screen flex-col text-gray-800 dark:text-gray-300">
      <Navigation handleTheme={handleTheme} theme={theme} />
      <section className="grow bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="py-6 text-4xl font-bold">Dashboard</h1>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
