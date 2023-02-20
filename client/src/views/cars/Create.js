// /* eslint-disable */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "../../components/layout/Layout";
import { Header } from "../../components/layout/HeaderTab";
import { Aside } from "../../components/layout/AsideTab";
import instance from "../../config/AxiosConfig";
import { useNavigate } from "react-router-dom";

function Car() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  // const [messageAlert, setMessageAlert] = useState("");

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
      .get(`/categories`)
      .then((response) => response.data)
      .then(function(response) {
        setCategories(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  }, []);

  useEffect(() => {}, [categories, error]);

  const postCar = async (data, event) => {
    event.preventDefault();
    const carForm = {
      registration: data.registration,
      engine: data.engine,
      maximum: data.maximum,
      category_id: data.category_id,
      km_of_insertion: data.km_of_insertion,
    };
    instance
      .post(`/cars`, carForm)
      .then(function(response) {
        // setMessageAlert(
          
        // );
        navigate("/cars", { state: { messageAlert: `Veículo com a matrícula ${carForm.registration} registada com sucesso!` } });
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
          <a href="/supplies">Veículos</a>
        </li>
        <li>
          <a href="">Registo</a>
        </li>
      </ul>

      <h3 className="uk-heading-bullet uk-text-bold">Registo de Veículos</h3>

      <div>
        {error.message ? (
          <div
            className="uk-alert-danger uk-margin-small-left"
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
            <label className="uk-margin">Nº da Matrícula</label>
            <input
              className="uk-input"
              type="text"
              name="registration"
              placeholder="Matricula da viatura"
              aria-invalid={errors.registration ? "true" : "false"}
              {...register("registration", {
                required: "Matricula da viatura",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.registration ? errors.registration.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Cilindrada</label>
            <input
              className="uk-input"
              type="number"
              name="engine"
              placeholder="Cilindada"
              step="0.000001"
              pattern="[0-9]{1,2}([\.][0-9]{1,2})?"
              aria-invalid={errors.engine ? "true" : "false"}
              {...register("engine", {
                pattern: "[0-9]{1,2}([.][0-9]{1,2})?",
                required: "Cilindrada não foi introduzida",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.engine ? errors.engine.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Capacidade do tanque</label>
            <input
              className="uk-input"
              type="number"
              name="maximum"
              placeholder="Capacidade máxima do tanque"
              pattern="[0-9]{1,2}([\.][0-9]{1,2})?"
              step="0.000001"
              aria-invalid={errors.maximum ? "true" : "false"}
              {...register("maximum", {
                pattern: "[0-9]{1,2}([.][0-9]{1,2})?",
                required: "Capacidade do tanque",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.maximum ? errors.maximum.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Kilometragem actual</label>
            <input
              className="uk-input"
              type="number"
              name="km_of_insertion"
              placeholder="Kilometragem actual"
              aria-invalid={errors.km_of_insertion ? "true" : "false"}
              {...register("km_of_insertion", {
                pattern: /^\d*\.?\d*$/,
                required: "Kilometragem do carro",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.km_of_insertion ? errors.km_of_insertion.message : ""}
            </p>
          </div>

          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom" htmlFor="category">
              Categoria
            </label>
            <div className="uk-form-controls">
              <select
                value={selectedValue}
                className="uk-select"
                name="category_id"
                id="category"
                {...register("category_id", {
                  required: "Categoria do veículo",
                })}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione a categoria do veículo
                </option>
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.category_id ? errors.category_id.message : ""}
            </p>
          </div>

          <div className="uk-width-1-1@s uk-margin">
            <button
              className="uk-button uk-button-primary uk-margin-top"
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

export default function CarCreate() {
  return <Layout header={<Header />} content={<Car />} aside={<Aside />} />;
}
