import { Link } from "react-router";
import IconArrowRight from "../../../assets/img/icon_arrow_right.png";

function LinkButton({ to, children }) {
  return (
    <Link
      to={to}
      className="h-12 pl-6 pr-4 border border-gray-dddddd bg-white inline-flex items-center gap-x-1 rounded-2xl hover:brightness-95 active:brightness-90 transition"
    >
      <span className="text-gray-818181 font-medium">{children}</span>
      <img src={IconArrowRight} className="size-6" />
    </Link>
  );
}

export default LinkButton;
