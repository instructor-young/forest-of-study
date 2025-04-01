import { useId, useState } from "react";
import IconVisibilityOff from "../assets/img/icon-visibility-off.png";
import IconVisibilityOn from "../assets/img/icon-visibility-on.png";

function PasswordInput({ label, placeholder, value, onChange: handleChange, ...props }) {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-4 flex flex-col">
      <label htmlFor={id} className="font-semibold text-black-414141 text-lg">
        {label}
      </label>
      <div className="flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-dddddd bg-white focus-within:border-gray-818181 transition">
        <input
          id={id}
          value={value}
          onChange={handleChange}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className="outline-none w-full placeholder:text-gray-818181"
          {...props}
        />

        <button type="button" onClick={() => setIsVisible((prev) => !prev)} className="cursor-pointer" tabIndex={-1}>
          <img src={isVisible ? IconVisibilityOn : IconVisibilityOff} alt="visibility" />
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
