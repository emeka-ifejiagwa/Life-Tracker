import { Link } from "react-router-dom";


export default function NavLink({ to, linkClassName, text , className, handleClick}) {
  return (
    <Link to={to} className={linkClassName}>
      <button className={className} onClick={handleClick}>{text}</button>
    </Link>
  );
}
