import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ goToHome = true }) => {
  return (
    <footer>
      <div className="text-center p-2 px-xl-5 bg-danger">
        <div className="text-white mb-3 mb-md-0">
          © Doken 2023, All rights reserved.
        </div>
        <div>
          <a href="#!" className="text-white me-4">
            <FontAwesomeIcon icon={faFacebookF} size="1x" />
          </a>
          <a href="#!" className="text-white me-4">
            <FontAwesomeIcon icon={faTwitter} size="1x" />
          </a>
          <a href="#!" className="text-white">
            <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
