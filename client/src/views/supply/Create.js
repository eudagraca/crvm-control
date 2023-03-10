/* eslint-disable */

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";
import { Layout } from "../../components/layout/Layout";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import instance from "../../config/AxiosConfig";

function Supply() {
  const [term, setTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState("");
  const [kmBefore, setKmBefore] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [error, setErrorResponse] = useState("");
  const [file, setFile] = useState();

  /*
  Setup validation
   */
  const {
    register,
    reset,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (term !== "") {
      onSearchSubmit(term);
    } else {
      clearResults();
    }
  }, [term, onSearchSubmit]);

  const onClickItem = (value) => () => {
    setCar(value);

    if (value.supplies[0]) {
      setKmBefore(value.supplies[0].km_actual);
    } else {
      setKmBefore(value.km_of_insertion);
    }
    clearResults();
  };

  useEffect(() => {
    if (car) {
      let defaultValues = {};
      defaultValues.km_before =
        car.supplies !== "undefined" && car.supplies.length > 0
          ? car.supplies[0].km_actual
          : car.km_of_insertion;
      defaultValues.primavera_id = "";
      defaultValues.km_actual = "";
      defaultValues.liters_supplied = "";
      defaultValues.value_supplied = "";
      defaultValues.requestor = "";
      defaultValues.requested_date = "";

      reset({ ...defaultValues });
    } else {
    }
  }, [car]);

  const clearResults = useCallback(() => {
    setCars([]);
    setErrorResponse("");
  });

  const handleKeyDown = (key) => {
    // setCar("");
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  //API Calls
  const onSearchSubmit = useCallback(async (term) => {
    instance
      .get(
        `/cars?page=0&limit=10&rank=1&registration=${term
          .toString()
          .toLowerCase()}`
      )
      .then(function(response) {
        setCars(response.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          setErrorResponse(error.response.data);
        }
      });
  });

  const postSupply = async (data, event) => {
    event.preventDefault();
    // const supplyForm = {
    //   car_id: car.id,
    //   primavera_id: data.primavera_id,
    //   km_before: kmBefore,
    //   km_actual: data.km_actual,
    //   liters_supplied: data.liters_supplied,
    //   value_supplied: data.value_supplied,
    //   requestor: data.requestor,
    //   requested_date: data.requested_date,
    //   primavera_file: file,
    // };
    const formData = new FormData();
    formData.append("car_id", car.id);
    formData.append("primavera_id", data.primavera_id);
    formData.append("km_before", kmBefore);
    formData.append("km_actual", data.km_actual);
    formData.append("liters_supplied", data.liters_supplied);
    formData.append("value_supplied", data.value_supplied);
    formData.append("requestor", data.requestor);
    formData.append("requested_date", data.requested_date);
    formData.append("primavera_file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    instance
      .post(`/supplies`, formData, config)
      .then(function(response) {
        navigate("/supplies", {
          state: {
            messageAlert: `Abastecimento registado com sucesso!`,
          },
        });
      })
      .catch(function(error) {
        if (error.response) {
          setErrorResponse(error.response.data);
        }
      });
  };

  return (
    <div>
      <ul className="uk-breadcrumb">
        <li>
          <a href="/supplies">Abastecimentos</a>
        </li>
        <li>
          <a href="">Registo</a>
        </li>
      </ul>

      <h3 className="uk-heading-bullet uk-text-bold">
        Registo de abastecimento
      </h3>

      <div className="uk-margin ">
        <form className="uk-search uk-search-default uk-margin-medium-left">
          {/* <span className="uk-search-icon-flip" uk-search-icon="true"></span> */}
          <input
            className="uk-search-input"
            type="search"
            placeholder="Ex:. AEA-950-MC"
            onChange={(e) => setTerm(e.target.value)}
            onChangeCapture={(term) => onSearchSubmit(term)}
            onKeyDown={handleKeyDown}
            value={term}
            aria-label="Search"
          />
        </form>
        <div>
          <ul className="uk-list uk-margin-large-left uk-margin-top">
            {cars.map((car, index) => {
              return (
                <li key={index}>
                  <a className="uk-link-reset" onClick={onClickItem(car)}>
                    {car.registration}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr />
      {error ? (
        <div className="uk-alert-danger uk-margin-medium-left" uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          <p className="uk-margin-left">{error.message}</p>
        </div>
      ) : (
        ""
      )}
      <div>{car ? <CarDetail car={car} /> : null}</div>
      <div>
        <form
          className="uk-grid"
          encType="multipart/form-data"
          onSubmit={handleSubmit(postSupply)}
        >
          <div className="uk-width-1-3@s uk-margin">
            <label className="uk-margin">N?? da requisi????o</label>
            <input
              className="uk-input"
              type="number"
              name="primavera_id"
              placeholder="Requisi????o Primavera"
              aria-invalid={errors.primavera_id ? "true" : "false"}
              {...register("primavera_id", {
                required: "Codigo da requisi????o do primavera",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.primavera_id ? errors.primavera_id.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">KM anterior</label>
            <input
              className="uk-input"
              type="number"
              name="km_before"
              readOnly
              defaultValue={
                typeof car.supplies !== "undefined" && car.supplies.length > 0
                  ? car.supplies[0].km_actual
                  : car.km_of_insertion
              }
              placeholder="KM Anterior"
              aria-invalid={errors.km_before ? "true" : "false"}
              {...register("km_before", {
                required: "Kilometragem anterior n??o foi introduzida",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.km_before ? errors.km_before.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">KM actual</label>
            <input
              className="uk-input"
              type="number"
              name="km_actual"
              placeholder="KM Actual"
              pattern="[0-9]{1,2}([\.][0-9]{1,2})?"
              step="0.000001"
              aria-invalid={errors.km_actual ? "true" : "false"}
              {...register("km_actual", {
                pattern: "[0-9]{1,2}([.][0-9]{1,2})?",
                required: "Kilometragem actual n??o foi introduzida",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.km_actual ? errors.km_actual.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Litros a abastecer</label>
            <input
              className="uk-input"
              type="number"
              name="liters_supplied"
              placeholder="Litros a abastecer"
              pattern="[0-9]{1,2}([\.][0-9]{1,2})?"
              step="0.000001"
              aria-invalid={errors.liters_supplied ? "true" : "false"}
              {...register("liters_supplied", {
                pattern: "[0-9]{1,2}([.][0-9]{1,2})?",
                required: "Litros que precisam ser abastecidios",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.liters_supplied ? errors.liters_supplied.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Valor abastecido</label>
            <input
              className="uk-input"
              type="number"
              name="value_supplied"
              placeholder="Valor abastecido"
              aria-label="value_supplied"
              pattern="[0-9]{1,2}([\.][0-9]{1,2})?"
              step="0.000001"
              aria-invalid={errors.value_supplied ? "true" : "false"}
              {...register("value_supplied", {
                pattern: "[0-9]{1,2}([.][0-9]{1,2})?",
                required: "Valor necessario para o abastecimento",
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.value_supplied ? errors.value_supplied.message : ""}
            </p>
          </div>

          <div className="uk-width-1-3@s">
            <label className="uk-margin-bottom">Requisitante</label>
            <input
              className="uk-input"
              type="text"
              name="requestor"
              placeholder="Nome"
              aria-label="Requisitante"
              aria-invalid={errors.requestor ? "true" : "false"}
              {...register("requestor", { required: "Nome do requisitante" })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.requestor ? errors.requestor.message : ""}
            </p>
          </div>
          <div className="uk-width-1-3@s uk-margin-top">
            <label className="uk-margin-bottom">Data da requisi????o</label>
            <input
              className="uk-input"
              type="date"
              name="requested_date"
              placeholder="Data"
              aria-label="Data da requisi????o"
              aria-invalid={errors.requested_date ? "true" : "false"}
              {...register("requested_date", {
                required: "Dia em que a requisi????o foi realizada",
                valueAsDate: true,
              })}
            />
            <p className="uk-text-danger uk-text-small uk-margin-remove-top">
              {errors.requested_date ? errors.requested_date.message : ""}
            </p>
          </div>
          <div className="uk-width-1-2@s uk-margin-top">
            <div className="js-upload uk-placeholder uk-text-center">
              <span uk-icon="icon: cloud-upload"></span>
              <span className="uk-text-middle uk-text-small">
                Adicione a aprova????o da requisi????o
              </span>
              <div className="uk-form-custom">
                <input
                  type="file"
                  name="primavera_file"
                  onChange={handleChange}
                />
                <span className="uk-link uk-margin-left uk-text-small">
                  Seleccionar
                </span>
              </div>
            </div>
          </div>

          <div className="uk-width-1-1@s uk-margin">
            <button
              className="uk-button uk-button-primary uk-margin-top"
              type="submit"
            >
              Registar o pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const CarDetail = (props) => {
  return (
    <div
      id="car-detail"
      className="uk-section uk-section-secondary uk-light uk-margin-medium-left uk-margin-bottom uk-padding-small"
    >
      <div className="uk-container uk-margin">
        <h4 className="uk-margin-left uk-text-normal">Detalhes da viaturas</h4>

        <div
          className="uk-grid-match uk-child-width-1-2@m uk-margin-small"
          uk-grid="true"
        >
          <div>
            <p className="uk-margin-small">
              Matr??cula: <b>{props.car.registration}</b>
            </p>
            <p className="uk-margin-small">
              Tanque: <b>{props.car.maximum} </b>Litros
            </p>
          </div>
          <div>
            <p className="uk-margin-small">
              Cilindradagem: <b>{props.car.engine}</b>
            </p>
            <p className="uk-margin-small">
              Categoria:{" "}
              <b>{props.car.category ? props.car.category.name : ""}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SupplyCreate() {
  return <Layout header={<Header />} content={<Supply />} aside={<Aside />} />;
}
