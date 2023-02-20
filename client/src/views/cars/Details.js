import React, { useEffect, useState } from "react";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";
import { Layout } from "../../components/layout/Layout";
import instance from "../../config/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import EmptyBox from "../../components/Empty";
import { useForm } from "react-hook-form";

function Car() {
  let { id } = useParams();
  const [car, setCar] = useState();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    instance
      .get(`cars/${id}`)
      .then((response) => response.data)
      .then(function(response) {
        setSelectedValue(response.data.category_id);
        setCar(response.data);
      });
  }, []);

  useEffect(() => {}, [car, categories, error]);

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

  return (
    <div className="uk-section uk-section-muted">
      <div className="uk-container">
        <h3 className="uk-heading-bullet uk-text-bolder"> {car ? car.registration : ""}</h3>

        <div uk-grid="true">
          <div className="uk-width-1-3@m">
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Cilindrada :</p>
              <span>{car ? car.engine : "NA"}</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Capacidade máxima :
              </p>
              <span>{car ? car.maximum : "NA"} Litros</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Kilometragem inicial do sistema :
              </p>
              <span>{car ? car.km_of_insertion : "NA"} KM</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Data de registro:</p>
              <span>
                {car ? format(new Date(car.createdAt), "dd-MM-yyyy") : "NA"}
              </span>
            </div>
            <a
              onClick={handleClick}
              className="uk-icon-link uk-margin-small-right uk-button uk-button-primary"
              uk-icon={bIcon}
            >
              {title}
            </a>
          </div>
          {/* <hr className="uk-divider-vertical"/> */}
          <div className="uk-width-expand@m">
            <p className="uk-uk-text-bold uk-text-muted uk-text-medium">
              Abastecimentos
            </p>

            <dl className="uk-description-list">
              {car ? (
                car.supplies ? (
                  car.supplies.map((supply, index) => {
                    return (
                      <div className="uk-margin-small-bottom " key={index}>
                        <dt className="uk-heading-bullet">
                          {supply.primavera_id +
                            " / " +
                            format(
                              new Date(supply.requested_date),
                              "dd-MM-yyyy"
                            )}
                        </dt>
                        <dd className="uk-margin-large-left">
                          {supply.requestor}
                        </dd>
                        <dd className="uk-margin-large-left">
                          Valor abastecido: {supply.value_supplied} Meticias
                        </dd>
                        <a href={`/supplies/${supply.id}`} className="uk-margin-large-left uk-button-link">
                          Ver tudo
                        </a>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <EmptyBox message={"Este veículo não tem abastecimentos"} />
                )
              ) : (
                ""
              )}
            </dl>
          </div>
        </div>
        <div>
          {showDiv && (
            <div id="car-details" className="uk-background-default">
              <h4 className="uk-heading-bullet uk-text-bolder uk-margin-small-left uk-text-muted">
                Actualizar
              </h4>
              <form
                className="uk-grid uk-background-default uk-margin-top"
                onSubmit={handleSubmit()}
              >
                <div className="uk-width-1-3@s uk-margin">
                  <label className="uk-margin">Nº da Matrícula</label>
                  <input
                    className="uk-input"
                    type="text"
                    name="registration"
                    placeholder="Matricula da viatura"
                    defaultValue={car ? car.registration : ""}
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
                    defaultValue={car ? car.engine : ""}
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
                  <label className="uk-margin-bottom">
                    Capacidade do tanque
                  </label>
                  <input
                    className="uk-input"
                    type="number"
                    name="maximum"
                    placeholder="Capacidade máxima do tanque"
                    defaultValue={car ? car.maximum : ""}
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
                  <label className="uk-margin-bottom">
                    Kilometragem actual
                  </label>
                  <input
                    className="uk-input"
                    type="number"
                    name="km_of_insertion"
                    placeholder="Kilometragem actual"
                    defaultValue={car ? car.km_of_insertion : ""}
                    aria-invalid={errors.km_of_insertion ? "true" : "false"}
                    {...register("km_of_insertion", {
                      pattern: /^\d*\.?\d*$/,
                      required: "Kilometragem do carro",
                    })}
                  />
                  <p className="uk-text-danger uk-text-small uk-margin-remove-top">
                    {errors.km_of_insertion
                      ? errors.km_of_insertion.message
                      : ""}
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
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CarDetails() {
  return <Layout header={<Header />} content={<Car />} aside={<Aside />} />;
}
