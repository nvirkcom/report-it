import "./FormErrors.scss";

function FormErrors({ formErrors }) {
  return (
    <ul className="list-disc rounded border border-red-600 bg-red-100 px-8 py-4 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-600">
      {formErrors.map((formError) => (
        <li key={formError.id}>{formError.text}</li>
      ))}
    </ul>
  );
}

export default FormErrors;
