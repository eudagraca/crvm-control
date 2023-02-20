import React from "react";
const { Footer } = require("./Footer");

export function Layout({ header, aside, content }) {
  return (
    <div className="uk-background-default">
      {/* <!--HEADER--> */}
      {header}
      {/* <!--/HEADER--> */}
      {/* <!-- LEFT BAR --> */}
      {aside}
      {/* <!-- /LEFT BAR --> */}
      {/* <!-- CONTENT --> */}
      <div
        id="content"
        data-uk-height-viewport="expand: true"
        className="uk-background-default"
      >
        <div className="uk-container uk-container-expand uk-background-default">
          {content}
          <Footer />
        </div>
      </div>
      {/* <!-- /CONTENT --> */}
    </div>
  );
}
