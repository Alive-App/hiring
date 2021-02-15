import { Link } from "react-router-dom";
const NavBottom = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light shadow-lg ">
      <div className="container text-end d-flex">
        <Link className="btn btn-primary mx-auto" to="/modal">
          Adicionar Ativo
        </Link>
      </div>
    </nav>
  );
};
export default NavBottom;
