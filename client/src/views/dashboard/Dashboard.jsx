import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Layout } from "../../components/layout/Layout";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";
import instance from "../../config/AxiosConfig";
import IsModOrAdmin from "../../components/IsModOrAdmin";

function DashboardLayout() {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    instance
      .get("/cars")
      .then(function(response) {
        setCars(response.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });

    instance
      .get("/supplies")
      .then(function(response) {
        setSupplies(response.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });

    instance
      .get("/users")
      .then(function(response) {
        setUsers(response.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  }, []);

  useEffect(() => {
    console.log(cars);
  }, [cars, error]);

  return (
    <div>
      {/* <div
        className="uk-grid uk-grid-divider uk-grid-medium uk-child-width-1-2 uk-child-width-1-4@l uk-child-width-1-5@xl"
        data-uk-grid
      >
        <div>
          <span className="uk-text-small">
            <span
              data-uk-icon="icon:users"
              className="uk-margin-small-right uk-text-primary"
            ></span>
            New Users
          </span>
          <h1 className="uk-heading-primary uk-margin-remove  uk-text-primary">
            2.134
          </h1>
          <div className="uk-text-small">
            <span className="uk-text-success" data-uk-icon="icon: triangle-up">
              15%
            </span>{" "}
            more than last week.
          </div>
        </div>
        <div>
          <span className="uk-text-small">
            <span
              data-uk-icon="icon:social"
              className="uk-margin-small-right uk-text-primary"
            ></span>
            Social Media
          </span>
          <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
            8.490
          </h1>
          <div className="uk-text-small">
            <span
              className="uk-text-warning"
              data-uk-icon="icon: triangle-down"
            >
              -15%
            </span>{" "}
            less than last week.
          </div>
        </div>
        <div>
          <span className="uk-text-small">
            <span
              data-uk-icon="icon:clock"
              className="uk-margin-small-right uk-text-primary"
            ></span>
            Traffic hours
          </span>
          <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
            12.00<small className="uk-text-small">PM</small>
          </h1>
          <div className="uk-text-small">
            <span className="uk-text-success" data-uk-icon="icon: triangle-up">
              {" "}
              19%
            </span>{" "}
            more than last week.
          </div>
        </div>
        <div>
          <span className="uk-text-small">
            <span
              data-uk-icon="icon:search"
              className="uk-margin-small-right uk-text-primary"
            ></span>
            Week Search
          </span>
          <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
            9.543
          </h1>
          <div className="uk-text-small">
            <span className="uk-text-danger" data-uk-icon="icon: triangle-down">
              {" "}
              -23%
            </span>{" "}
            less than last week.
          </div>
        </div>
        <div className="uk-visible@xl">
          <span className="uk-text-small">
            <span
              data-uk-icon="icon:users"
              className="uk-margin-small-right uk-text-primary"
            ></span>
            Lorem ipsum
          </span>
          <h1 className="uk-heading-primary uk-margin-remove uk-text-primary">
            5.284
          </h1>
          <div className="uk-text-small">
            <span className="uk-text-success" data-uk-icon="icon: triangle-up">
              {" "}
              7%
            </span>{" "}
            more than last week.
          </div>
        </div>
      </div> */}
      <hr />
      <div
        className="uk-grid uk-grid-medium"
        data-uk-grid
        uk-sortable="handle: .sortable-icon"
      >
        <div className="uk-margin-right uk-card uk-card-hover uk-border-rounded uk-card-body uk-width-1-4@m dash-card">
          <p>
            {" "}
            <span
              data-uk-icon="icon:users"
              className="uk-margin-small-right uk-text-primary"
            ></span>
            <span className="uk-h3 uk-text-muted uk-text-bolder">
              {" "}
              {supplies ? supplies.length : 0}{" "}
            </span>
            <span className="uk-h4 uk-text-success uk-text-bolder">
              Abastecimentos
            </span>
          </p>
        </div>

        {/* <div className="uk-margin-right uk-card uk-card-hover uk-border-rounded uk-card-body uk-width-1-4@m dash-card">
          <p>
            <span className="uk-h3 uk-text-muted uk-text-bolder"> 1 </span>
            <span className="uk-h4 uk-text-success uk-text-bolder">
              Clientes
            </span>
          </p>
        </div> */}

        <IsModOrAdmin>
          <div className="uk-margin-right uk-card uk-card-hover uk-border-rounded uk-card-body uk-width-1-4@m dash-card">
            <p>
              <span className="uk-h3 uk-text-muted uk-text-bolder">
                {" "}
                {users ? users.length : 0}{" "}
              </span>
              <span className="uk-h4 uk-text-success uk-text-bolder">
                Usu??rios
              </span>
            </p>
          </div>
        </IsModOrAdmin>

        <div className="uk-margin-right uk-card uk-card-hover uk-border-rounded uk-card-body uk-width-1-4@m dash-card">
          <p>
            <span className="uk-h3 uk-text-muted uk-text-bolder">
              {" "}
              {cars ? cars.length : 0}{" "}
            </span>
            <span className="uk-h4 uk-text-success uk-text-bolder">
              Ve??culos
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Layout
      header={<Header />}
      content={<DashboardLayout />}
      aside={<Aside />}
    />
  );
}
