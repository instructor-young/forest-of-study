import { Link } from "react-router";
import CTALarge from "../assets/img/cta-lg.png";
import LogoLarge from "../assets/img/logo-lg.png";

function Header() {
  return (
    <header className="h-[100px] padding py-5 px-6">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between">
        <Link to={"/"}>
          <img src={LogoLarge} className="h-[60px]" />
        </Link>
        <img src={CTALarge} className="h-[58px]" />
      </div>
    </header>
  );
}

export default Header;
