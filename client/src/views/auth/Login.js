import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../../config/AxiosConfig";


export default function SignIn() {
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState({});
  /*
  Setup validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login = async (data, event) => {
    event.preventDefault();
    const carForm = {
      username: data.username,
      password: data.password,
    };
    instance
      .post(`/auth/signin`, carForm)
      .then(function(response) {
        if (response.status === 200) {
          localStorage.clear();

          const data = response.data;
          const token = data.data ? data.data.accessToken : null;
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("user-role", data.data.roles);
          localStorage.setItem("user-token", token);
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      })
      .catch(function(error) {
        setErrorResponse(error.response.data);
      });
  };

  return (
    <div className="uk-background-default uk-height-1-1@m uk-margin-remove-top">
      <div className="uk-section ">
        <div className="uk-container uk-height-1-1@m">
          <h3 className="uk-text-bold uk-tex-muted uk-heading-bullet">Sistema de controle de abastecimento de viaturas </h3>
          <img
            height="10px"
            width="20%"
            alt="CRVM Logo"
            src="https://crvm.co.mz/assets/img/slide/a.png"
          />

          <div className="uk-grid-match uk-child-width-1-2@m" uk-grid="true">
            <div className="uk-margin-top uk-padding-remove">
              <p >
              Seja bem-vindo! Este sistema foi desenvolvido para ajudá-lo a gerenciar as atividades da sua empresa de forma eficiente e eficaz.
              </p>
            </div>
            <div>
              {errorResponse.message ? (
                <div className="uk-alert-danger" uk-alert="true">
                  <a className="uk-alert-close" uk-close="true"></a>
                  <p className="uk-margin-left">{errorResponse.message}</p>
                </div>
              ) : (
                ""
              )}
              <form onSubmit={handleSubmit(login)}>
                <div className="uk-margin uk-child-width-1-1@m">
                  <label className="uk-text-light" htmlFor="email-user">
                    Nome de usuário ou email
                  </label>
                  <div className="uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input
                      id="email-user"
                      className="uk-input"
                      type="text"
                      name="username"
                      placeholder="Nome de usuário ou email"
                      aria-invalid={errors.username ? "true" : "false"}
                      {...register("username", {
                        required: "Nome de usuário ou email",
                      })}
                    />
                  </div>
                  <p className="uk-text-danger uk-text-small uk-margin-remove-top">
                    {errors.username ? errors.username.message : ""}
                  </p>
                </div>

                <div className="uk-margin uk-margin uk-child-width-1-1@m">
                  <label className="uk-text-light" htmlFor="password">
                    Senha
                  </label>
                  <div className="uk-inline">
                    <span
                      className="uk-form-icon uk-form-icon-flip"
                      uk-icon="icon: lock"
                    ></span>
                    <input
                      id="password"
                      className="uk-input"
                      type="password"
                      name="password"
                      placeholder="Senha"
                      aria-invalid={errors.password ? "true" : "false"}
                      {...register("password", {
                        required: "Introduza a senha",
                      })}
                    />
                  </div>
                  <p className="uk-text-danger uk-text-small uk-margin-remove-top">
                    {errors.password ? errors.password.message : ""}
                  </p>
                </div>
                <button
                  type="submit"
                  className="uk-button uk-button-primary uk-align-right"
                >
                  Aceder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
