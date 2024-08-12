import React from "react";
import { budgetIcon } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div>
        <img
          className="img-header"
          src={budgetIcon as any}
          onClick={() => navigate("/")}
          width={50}
          height={50}
          alt=""
        />
      </div>
      <h1>Personal Budget Tracker</h1>
      <Link className="summary" to="/summary">
        Summary
      </Link>
      <Link className="List" to="/add">
        Make-Entry
      </Link>
    </header>
  );
};
