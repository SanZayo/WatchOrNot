import { Link } from "react-router-dom";

type Props = {};

function NotFound({}: Props) {
  return (
    <div>
      <h2>404 - Page Not Found!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default NotFound;
