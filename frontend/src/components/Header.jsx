import { Link, useResolvedPath } from "react-router";
import CTALarge from "../assets/img/cta-lg.png";
import LogoLarge from "../assets/img/logo-lg.png";

function Header() {
  const { pathname } = useResolvedPath();

  const isCreateStudyButtonVisible = pathname === "/" || pathname === "/studies/new";

  return (
    <header className="h-[100px] padding py-5 px-6">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between">
        <Link to={"/"}>
          <img src={LogoLarge} className="h-[60px] hover:brightness-95 active:brightness-90 transition" />
        </Link>

        {isCreateStudyButtonVisible && (
          <Link to={"/studies/new"}>
            <img src={CTALarge} className="h-[58px] hover:brightness-95 active:brightness-90 transition" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
