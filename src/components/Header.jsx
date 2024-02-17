import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutBTN from "./LogoutBTN";

export default function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
    },
  ];
  return (
    <div className="max-w-7xl m-auto">
      <nav className="flex">
        <div className="mr-4">
          <Link to={"/"} className="font-bold">
            Blogger
          </Link>
        </div>
        <ul className="flex ml-auto space-x-6">
          {navItems.map((data, index) =>
            data.active ? (
              <>
                <li key={index}>
                  <button onClick={() => navigate(data.slug)}>
                    {data.name}
                  </button>
                </li>
              </>
            ) : null
          )}

          {authStatus ? (
            <li>
              <LogoutBTN />
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}
