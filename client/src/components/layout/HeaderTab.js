import React, { useEffect, useState } from "react";

export function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {}, [user]);
  return (
    <header id="top-head" className="uk-position-fixed">
      <div className="uk-container uk-container-expand uk-background-primary">
        <nav
          className="uk-navbar uk-light"
          data-uk-navbar="mode:click; duration: 250"
        >
          <div className="uk-navbar-left">
            <div className="uk-navbar-item uk-hidden@m">
              <a className="uk-logo" href="">
                <img
                  className="custom-logo"
                  src="img/dashboard-logo-white.svg"
                  alt=""
                />
              </a>
            </div>
            <ul className="uk-navbar-nav uk-visible@m">
              <li>
                <a href="">CRVM</a>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a
                  href=""
                  data-uk-icon="icon:user"
                  title="Your profile"
                  data-uk-tooltip = "Perfil"
                ></a>
                <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li className="uk-active"><a href={`/users/${user.id}`}>Perfil</a></li>
                        <li><a href="#">Trocar de senha</a></li>
                    </ul>
                </div>
              </li>
              <li>
                <a
                  href=""
                  data-uk-icon="icon:  sign-out"
                  title="Sign Out"
                  data-uk-tooltip="Sair"
                ></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
