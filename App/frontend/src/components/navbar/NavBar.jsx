import { Link } from "react-router-dom";
import { MdConstruction } from "react-icons/md";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 h-screen w-100 flex flex-col bg-gray-900 text-white shadow-lg items-center">
      <div>
        <Link to="/">
          <MdConstruction size={80} />
        </Link>
      </div>
      <h1>Evergreen Construction</h1>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/construction_materials">Construction Materials</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
