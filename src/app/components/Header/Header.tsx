import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { onLogout } from "../../../../firebase/firebase";

const Header = ({ goToHome = true }) => {
  const router = useRouter();
  const goHome = () => {};
  return (
    <header
      className={clsx("px-2 d-flex col", {
        end: !goToHome,
      })}
    >
      {goToHome && (
        <Button type="button" variant="text" onClick={goHome}>
          <FontAwesomeIcon icon={faArrowLeft} size="1x" color="#dc3545" />
          <label className="px-2 cursor-pointer">
            <strong>Home</strong>
          </label>
        </Button>
      )}
      <Button variant="danger" onClick={() => onLogout()}>
        Logout
      </Button>
    </header>
  );
};

export default Header;
