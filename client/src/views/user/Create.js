/* eslint-disable */

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/layout/HeaderTab";
import { Aside } from "../../components/layout/AsideTab";
import instance from "../../config/AxiosConfig";
import { Layout } from "../../components/layout/Layout";
import { containsValue } from "../../utils/Utils";

function User() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  /*
  Setup validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    instance
      .get("/roles")
      .then((response) => response.data)
      .then(function(response) {
        setRoles(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  }, []);

  useEffect(() => {}, [roles, error]);

  const minLengthCondition = (value) => {
    if (containsValue(value.substr(0, 3), ["258"]) && value.length == 12) {
      return {
        isValid: true,
        message: "",
      };
    } else if (
      containsValue(value.substr(0, 2), ["82", "83", "84", "85", "86", "87"]) &&
      value.length == 9
    ) {
      return {
        isValid: true,
        message: "",
      };
    } else {
      return "Número de telefone inválido";
    }
  };

  const postCar = async (data, event) => {
    event.preventDefault();

    const userForm = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      phone: data.phone,
      roles: [data.roles],
      username: data.username,
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
    instance
      .post("/auth/signup", userForm)
      .then(function(response) {
        navigate("/users");
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  };

  return (
    <div>
      <ul className="uk-breadcrumb">
        <li>
          <a href="/users">Usuário</a>
        </li>
        <li>
          <a href="">Registo</a>
        </li>
      </ul>

      <h3 className="uk-heading-bullet uk-text-bold">Registo de Usuário</h3>
      <hr />

      <div>
        {error.message ? (
          <div
            className="uk-alert-danger uk-margin-medium-left"
            uk-alert="true"
          >
            <a className="uk-alert-close" uk-close="true"></a>
            <p className="uk-margin-left">{error.message}</p>
          </div>
        ) : (
          ""
        )}
        <form className="uk-grid" onSubmit={handleSubmit(postCar)}>
          <div className="uk-width-1-3@s uk-margin">
            <label className="uk-margin">Primeiro Nome</label>
            <input
              className="uk-input"
              type="text"
              name="first_name"
              placeholder="Primeiro Nome"
              aria-invalid={errors.first_name ? "true" : "false"}
              {...register("first_name", {
                required: "O campo do primeiro nome é obrigatório",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.first_name ? errors.first_name.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Ultimo Nome</label>
            <input
              className="uk-input"
              type="text"
              name="last_name"
              placeholder="Ultimo Nome"
              aria-invalid={errors.last_name ? "true" : "false"}
              {...register("last_name", {
                required: "O campo do último nome ´ obrigatório",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.last_name ? errors.last_name.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Nome de usuário</label>
            <input
              className="uk-input"
              type="text"
              name="username"
              placeholder="Nome de usuário"
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", {
                required: "O campo de nome de usuário é obrigatório",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.username ? errors.username.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Contacto Telefónico</label>
            <input
              className="uk-input"
              type="number"
              name="phone"
              placeholder="Contacto telefónico"
              data-prefix="258"
              minLength={9}
              maxLength={12}
              min="0"
              aria-invalid={errors.phone ? "true" : "false"}
              {...register("phone", {
                pattern: "^[0-9]*$",
                validate: minLengthCondition,
                required: "O campo de contacto telefónico é obrigatório",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.phone ? errors.phone.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">E-mail</label>
            <input
              className="uk-input"
              type="email"
              name="email"
              placeholder="E-mail"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "O campo de e-mail é obrigatório",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "O email introduzido não é válido",
                },
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.email ? errors.email.message : ""}
            </p>
          </div>

          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom" htmlFor="roles">
              Previlégio
            </label>
            <div className="uk-form-controls">
              <select
                value={selectedValue}
                className="uk-select"
                name="roles"
                id="roles"
                {...register("roles", {
                  required: "A selecção do previlégio é obrigatório",
                })}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione o previlégio
                </option>
                {roles.map((role, index) => {
                  return (
                    <option key={index} value={role.name}>
                      {role.description}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.roles ? errors.roles.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s uk-margin">
            <label className="uk-margin-bottom">Senha de acesso</label>
            <input
              className="uk-input"
              type="password"
              name="password"
              placeholder="Senha"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "O campo da senha é obrigatório",
                minLength: {
                  value: 5,
                  message: "Tamanho minimo é de 5 caracteres",
                },
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.password ? errors.password.message : ""}
            </p>
          </div>

          <div className="uk-width-1-1@s uk-margin">
            <button
              className="uk-button uk-button-primary uk-margin-top uk-align-right"
              type="submit"
            >
              Registar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserCreate() {
  return <Layout header={<Header />} content={<User />} aside={<Aside />} />;
}
