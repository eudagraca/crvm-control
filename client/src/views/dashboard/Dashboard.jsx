import React from "react";
import "./dashboard.css";
import { Layout } from "../../components/layout/Layout";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";


function DashboardLayout() {
  return (
    <div>
      <div
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
            <span className="uk-text-warning" data-uk-icon="icon: triangle-down">
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
      </div>
      <hr />
      <div
        className="uk-grid uk-grid-medium"
        data-uk-grid
        uk-sortable="handle: .sortable-icon"
      >
        {/* <!-- panel --> */}
        <div className="uk-width-1-2@l">
          <div className="uk-card uk-card-default uk-card-small uk-card-hover">
            <div className="uk-card-header">
              <div className="uk-grid uk-grid-small">
                <div className="uk-width-auto">
                  <h4>Sales Chart</h4>
                </div>
                <div className="uk-width-expand uk-text-right panel-icons">
                  <a
                    href="#"
                    className="uk-icon-link sortable-icon"
                    title="Move"
                    data-uk-tooltip
                    data-uk-icon="icon: move"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Configuration"
                    data-uk-tooltip
                    data-uk-icon="icon: cog"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Close"
                    data-uk-tooltip
                    data-uk-icon="icon: close"
                  ></a>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <div className="chart-container">
                <canvas id="chart2"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /panel --> */}
        {/* <!-- panel --> */}
        <div className="uk-width-1-2@l">
          <div className="uk-card uk-card-default uk-card-small uk-card-hover">
            <div className="uk-card-header">
              <div className="uk-grid uk-grid-small">
                <div className="uk-width-auto">
                  <h4>Predictions Chart</h4>
                </div>
                <div className="uk-width-expand uk-text-right panel-icons">
                  <a
                    href="#"
                    className="uk-icon-link sortable-icon"
                    title="Move"
                    data-uk-tooltip
                    data-uk-icon="icon: move"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Configuration"
                    data-uk-tooltip
                    data-uk-icon="icon: cog"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Close"
                    data-uk-tooltip
                    data-uk-icon="icon: close"
                  ></a>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <div className="chart-container">
                <canvas id="chart1"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /panel --> */}
        {/* <!-- panel --> */}
        <div className="uk-width-1-1 uk-width-1-3@l uk-width-1-2@xl">
          <div className="uk-card uk-card-default uk-card-small uk-card-hover">
            <div className="uk-card-header">
              <div className="uk-grid uk-grid-small">
                <div className="uk-width-auto">
                  <h4>Activity Chart</h4>
                </div>
                <div className="uk-width-expand uk-text-right panel-icons">
                  <a
                    href="#"
                    className="uk-icon-link sortable-icon"
                    title="Move"
                    data-uk-tooltip
                    data-uk-icon="icon: move"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Configuration"
                    data-uk-tooltip
                    data-uk-icon="icon: cog"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Close"
                    data-uk-tooltip
                    data-uk-icon="icon: close"
                  ></a>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <div className="chart-container">
                <canvas id="chart3"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /panel --> */}
        {/* <!-- panel --> */}
        <div className="uk-width-1-2@s uk-width-1-3@l uk-width-1-4@xl">
          <div className="uk-card uk-card-default uk-card-small uk-card-hover">
            <div className="uk-card-header">
              <div className="uk-grid uk-grid-small">
                <div className="uk-width-auto">
                  <h4>Distribution Chart</h4>
                </div>
                <div className="uk-width-expand uk-text-right panel-icons">
                  <a
                    href="#"
                    className="uk-icon-link sortable-icon"
                    title="Move"
                    data-uk-tooltip
                    data-uk-icon="icon: move"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Configuration"
                    data-uk-tooltip
                    data-uk-icon="icon: cog"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Close"
                    data-uk-tooltip
                    data-uk-icon="icon: close"
                  ></a>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <div className="chart-container">
                <canvas id="chart4"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /panel --> */}
        {/* <!-- panel --> */}
        <div className="uk-width-1-2@s uk-width-1-3@l uk-width-1-4@xl">
          <div className="uk-card uk-card-default uk-card-small uk-card-hover">
            <div className="uk-card-header">
              <div className="uk-grid uk-grid-small">
                <div className="uk-width-auto">
                  <h4>Population Chart</h4>
                </div>
                <div className="uk-width-expand uk-text-right panel-icons">
                  <a
                    href="#"
                    className="uk-icon-link sortable-icon"
                    title="Move"
                    data-uk-tooltip
                    data-uk-icon="icon: move"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Configuration"
                    data-uk-tooltip
                    data-uk-icon="icon: cog"
                  ></a>
                  <a
                    href="#"
                    className="uk-icon-link"
                    title="Close"
                    data-uk-tooltip
                    data-uk-icon="icon: close"
                  ></a>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <div className="chart-container">
                <canvas id="chart5"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /panel -->  */}
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