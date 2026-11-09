import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        🎬 Movie Explorer
      </Link>

      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Header;