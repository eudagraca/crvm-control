import React, { useEffect, useState } from "react";
import { ROLES } from "../../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckDroplet,
  faTruckPlane,
  faPersonMilitaryToPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import IsAdmin from "../IsAdmin";
import IsModOrAdmin from "../IsModOrAdmin";

// import {faT} from "@fortawesome/free-regular-svg-icons"
export function Aside() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // console.log(user);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {}, [user]);

  return (
    <aside id="left-col" className="uk-light uk-visible@m">
      <div className="left-logo uk-flex uk-flex-middle">
        <img
          className="custom-logo"
          src="https://crvm.co.mz/assets/img/slide/a.png"
          alt=""
        />
      </div>
      <div className="left-content-box  content-box-dark">
        <img
          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-56-116417.png?f=avif&w=512"
          alt=""
          width="100px"
          height="100px"
          className="uk-border-circle profile-img"
        />
        <h4 className="uk-text-center uk-margin-remove-vertical text-light">
          {user ? user.full_name : ""}
        </h4>

        <div className="uk-position-relative uk-text-center uk-display-block">
          <a
            href=""
            className="uk-text-small uk-text-muted uk-display-block uk-text-center"
            data-uk-icon="icon: triangle-down; ratio: 0.7"
          >
            {user ? ROLES[user.roles] : ""}
          </a>
          {/* <!-- user dropdown --> */}
          <div
            className="uk-dropdown user-drop"
            data-uk-dropdown="mode: click; pos: bottom-center; animation: uk-animation-slide-bottom-small; duration: 150"
          >
            <ul className="uk-nav uk-dropdown-nav uk-text-left">
              <li className="uk-nav-divider"></li>
              <li>
                <a href={`/users/${user.id}`}>
                  <span data-uk-icon="icon: image"></span> Perfil
                </a>
              </li>
              <li className="uk-nav-divider"></li>
              <li>
                <a href="/auth/signout">
                  <span data-uk-icon="icon: sign-out"></span> Sair
                </a>
              </li>
            </ul>
          </div>
          {/* <!-- /user dropdown --> */}
        </div>
      </div>

      <div className="left-nav-wrap">
        <ul className="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
          <li className="uk-nav-header">ACTIONS</li>
          <li className="uk-parent">
            <a href="">
              <FontAwesomeIcon icon={faTruckPlane} />
              VEÍCULOS
            </a>
            <ul className="uk-nav-sub">
              <li>
                <a href="/cars">TODOS</a>
              </li>
              <IsModOrAdmin>
                <li>
                  <a href="/cars/create">NOVO</a>
                </li>
              </IsModOrAdmin>
            </ul>
          </li>
          <li className="uk-parent">
            <a href="">
              <FontAwesomeIcon
                icon={faTruckDroplet}
                className="fa-tint fa-droplet"
              />
              ABASTECIMENTO
            </a>
            <ul className="uk-nav-sub">
              <li>
                <a href="/supplies">TODOS</a>
              </li>
              <li>
                <a href="/supplies/create">NOVO</a>
              </li>
            </ul>
          </li>
          {/* <IsModOrAdmin>
            <li className="uk-parent">
              <a href="">
                <div>
                  <FontAwesomeIcon icon={faPersonMilitaryToPerson} />
                </div>
                CLIENTES
              </a>
              <ul className="uk-nav-sub">
                <li>
                  <a href="/supplies">TODOS</a>
                </li>
                <li>
                  <a href="/supplies/create">NOVO</a>
                </li>
              </ul>
            </li>
          </IsModOrAdmin> */}
          <IsAdmin>
            <li className="uk-parent">
              <a href="">
                <span
                  data-uk-icon="icon: users"
                  className="uk-margin-small-right"
                ></span>
                USUÁRIOS
              </a>
              <ul className="uk-nav-sub">
                <li>
                  <a href="/users">TODOS</a>
                </li>
                <li>
                  <a href="/users/create">NOVO</a>
                </li>
              </ul>
            </li>
          </IsAdmin>
        </ul>
        {/* <div className="left-content-box uk-margin-top">
          <h5>Daily Reports</h5>
          <div>
            <span className="uk-text-small">
              Traffic <small>(+50)</small>
            </span>
            <progress className="uk-progress" value="50" max="100"></progress>
          </div>
          <div>
            <span className="uk-text-small">
              Income <small>(+78)</small>
            </span>
            <progress
              className="uk-progress success"
              value="78"
              max="100"
            ></progress>
          </div>
          <div>
            <span className="uk-text-small">
              Feedback <small>(-12)</small>
            </span>
            <progress
              className="uk-progress warning"
              value="12"
              max="100"
            ></progress>
          </div>
        </div> */}
      </div>
      {/* <div className="bar-bottom">
        <ul
          className="uk-subnav uk-flex uk-flex-center uk-child-width-1-5"
          data-uk-grid
        >
          <li>
            <a
              href=""
              className="uk-icon-link"
              data-uk-icon="icon: home"
              title="Home"
              data-uk-tooltip
            ></a>
          </li>
          <li>
            <a
              href=""
              className="uk-icon-link"
              data-uk-icon="icon: settings"
              title="Settings"
              data-uk-tooltip
            ></a>
          </li>
          <li>
            <a
              href=""
              className="uk-icon-link"
              data-uk-icon="icon: social"
              title="Social"
              data-uk-tooltip
            ></a>
          </li>

          <li>
            <a
              href=""
              className="uk-icon-link"
              data-uk-tooltip="Sign out"
              data-uk-icon="icon: sign-out"
            ></a>
          </li>
        </ul>
      </div> */}
    </aside>
  );
}
