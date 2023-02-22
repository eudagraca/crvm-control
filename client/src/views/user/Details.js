import React, { useEffect, useState } from "react";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";
import { Layout } from "../../components/layout/Layout";
import instance from "../../config/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import EmptyBox from "../../components/Empty";
import { useForm } from "react-hook-form";
import containsValue from "../../utils/Utils";
import jwt_decode from "jwt-decode";

function User() {
  let { id } = useParams();
  const [user, setUser] = useState();
  const [token, setToken] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [title, setTitle] = useState("Editar");
  const [bIcon, setBIcon] = useState("file-edit");
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

  useEffect(() => {
    instance
      .get(`users/${id}`)
      .then((response) => response.data)
      .then(function(response) {
        setSelectedValue(response.data.roles && response.data.roles[0].id);
        setUser(response.data);
        let token = localStorage.getItem("user-token");
        if (token) {
          //TODO Create single point to get Token and avoid repetition 
          setToken(jwt_decode(token));
        }
      });
  }, []);

  useEffect(() => {
  }, [user, roles, error]);

  const handleClick = () => {
    setShowDiv(!showDiv);
    if (showDiv) {
      setTitle("Editar");
      setBIcon("file-edit");
    } else {
      setBIcon("file-edit");
      setTitle("Cancelar");
    }
  };

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

  return (
    <div className="uk-section uk-section-muted">
      <div className="uk-container">
        <h3 className="uk-heading-bullet uk-text-bolder">
          {user ? (user.id === token.id ? "Meu Perfil" : "Dados do usuário") : ""}
        </h3>
        <div>
          <div
            id="user-details"
            className="uk-background-default uk-padding uk-uk-padding-remove-right uk-padding-remove-left"
          >
            <p className="uk-uk-padding-large"></p>
            <form
              className="uk-grid uk-background-default"
              onSubmit={handleSubmit()}
            >
              <div className="uk-width-1-3@s uk-margin">
                <label className="uk-margin">Primeiro Nome</label>
                <input
                  className="uk-input"
                  type="text"
                  name="first_name"
                  placeholder="Primeiro Nome"
                  aria-invalid={errors.first_name ? "true" : "false"}
                  defaultValue={user && user.first_name}
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
                  defaultValue={user && user.last_name}
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
                  defaultValue={user && user.username}
                  readOnly
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
                  defaultValue={user && user.phone}
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
                  defaultValue={user && user.email}
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

              <div className="uk-width-1-1@s uk-margin">
                <button
                  className="uk-button uk-button-primary uk-margin-top uk-align-right"
                  type="submit"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDetails() {
  return <Layout header={<Header />} content={<User />} aside={<Aside />} />;
}
