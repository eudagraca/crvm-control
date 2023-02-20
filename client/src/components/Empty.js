import React from "react";
export default function EmptyBox(props) {
  return (
    <div className="uk-uk-child-width-1-1@m uk-text-center">
      <span className="uk-align-center uk-margin-small" uk-icon="icon: album; ratio: 2"></span>
      <p className="uk-text-light uk-margin-remove">{props.message}</p>
    </div>
  );
}
