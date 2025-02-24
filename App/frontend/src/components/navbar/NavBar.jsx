import { Link } from "react-router-dom";
import { PiTreeEvergreenDuotone } from "react-icons/pi";

const Navbar = ({ tables }) => {
  const formTableTitle = (table) => {
    return table
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  return (
    <header>
      <div className="mt-2">
        <Link to="/">
          <PiTreeEvergreenDuotone size={80} />
        </Link>
      </div>
      <h1 className="text-xl font-serif mb-10 text-center">
        Evergreen Construction
      </h1>
      <div className="bg-gradient-to-br from-gray-800 to-gray-750 p-3 rounded-lg ">
        <nav>
          <div className="my-9 p-3 text-center rounded-md">
            <Link
              className="transition ease-in-out delay-75 border mb-5 mrl-5 text-center p-3 rounded-lg hover:bg-gray-700"
              to="/"
            >
              Home
            </Link>
          </div>

          {tables.map((table) => (
            <div key={table} className="mb-9 p-3 text-center rounded-md">
              <Link
                className="transition ease-in-out delay-75 border mb-5 mrl-5 text-center p-3 rounded-lg hover:bg-gray-700"
                to={`/${table}`}
              >
                {formTableTitle(table)}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
