import { useId } from "react";

function Input({ label, placeholder, multiline, rows }) {
  const id = useId();

  return (
    <div className="space-y-4 flex flex-col">
      <label htmlFor={id} className="font-semibold text-black-414141 text-lg">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={rows}
          className="resize-none px-5 py-4 rounded-2xl border border-gray-dddddd bg-white placeholder:text-gray-818181 outline-none focus-within:border-gray-818181 transition"
        />
      ) : (
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          className="px-5 py-4 rounded-2xl border border-gray-dddddd bg-white placeholder:text-gray-818181 outline-none focus-within:border-gray-818181 transition"
        />
      )}
    </div>
  );
}

export default Input;
