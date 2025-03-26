import { cva } from "class-variance-authority";
import IconPerson from "../assets/img/icon-person.png";
import IconPoint from "../assets/img/icon-point.png";

const tagVariants = cva(
  "rounded-[50px] border font-medium border-black/10 inline-flex items-center",
  {
    variants: {
      theme: {
        dark: "bg-black/50 text-white",
        light: "bg-white/30 text-black-414141",
      },
      size: {
        md: "py-1 px-3 text-xs",
        lg: "py-2 px-4 text-base",
      },
    },
    defaultVariants: {
      theme: "light",
      size: "md",
    },
  }
);

function Tag({ type, value, theme, size }) {
  const icon =
    type === "point" ? (
      <img
        src={IconPoint}
        data-size={size}
        className="w-[14px] h-[14px] data-[size=lg]:size-[20px]"
      />
    ) : (
      <img src={IconPerson} className="w-3 h-3" />
    );
  const label = type === "point" ? `${value}P 획득` : value;

  return (
    <div className={tagVariants({ theme, size })}>
      {icon}
      <span className="ml-1 leading-none">{label}</span>
    </div>
  );
}

export default Tag;
