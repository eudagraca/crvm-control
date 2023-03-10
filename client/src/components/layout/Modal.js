import React from "react";
import UIkit from "uikit";

function Modal(props) {
  const handleCloseModal = () => {
    UIkit.modal("#modal-example").hide();
    props.setIsOpen(false);
  };

  return (
    <div>
      {props.isOpen && (
        <div>
          <button
            className="uk-button uk-button-default uk-margin-small-right"
            type="button"
            uk-toggle="target: #modal-example"
          >
            Open
          </button>

          <div id="modal-example" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Headline</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="uk-text-right">
                <button
                  className="uk-button uk-button-default uk-modal-close"
                  type="button"
                >
                  Cancel
                </button>
                <button className="uk-button uk-button-primary" type="button">
                  Save
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
