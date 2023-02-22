import React, { useEffect, useState } from "react";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";
import { Layout } from "../../components/layout/Layout";
import instance from "../../config/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import EmptyBox from "../../components/Empty";
import { useForm } from "react-hook-form";

function Supply() {
  let { id } = useParams();
  const [supply, setSupply] = useState();
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
      .get(`supplies/${id}`)
      .then((response) => response.data)
      .then(function(response) {
        setSupply(response.data);
        // console.log(encodeURIComponent(response.data.primavera_file));
      });
  }, []);

  useEffect(() => {}, [supply, error]);

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
        <h3 className="uk-heading-bullet uk-text-bolder uk-margin-remove-bottom">
          {" "}
          Abastecimento do veículo
        </h3>
        <p className="uk-margin-medium-left">
          {supply ? supply.car.registration : ""}
          <a
          target="_blank"
            href={`/document/${encodeURIComponent(supply ? supply.primavera_file: '')}`}
            // DisplayDocument
            className="uk-button  uk-button-small  uk-button-secondary uk-margin-left"
          >
            Requisição Primavera <sapn uk-icon="file-pdf"></sapn>
          </a>
        </p>
        <hr />

        <div uk-grid="true">
          <div className="uk-width-1-3@m">
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Código Primavera :</p>
              <span>{supply ? supply.primavera_id : "NA"}</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Kilometragem anterior:
              </p>
              <span>{supply ? supply.km_before : "NA"} KM</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Kilometragem actual
              </p>
              <span>{supply ? supply.km_actual : "NA"} KM</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Kilometragem percorida
              </p>
              <span>{supply ? supply.km_traveled : "NA"} KM</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Data da requisição:
              </p>
              <span>
                {supply
                  ? format(new Date(supply.requested_date), "dd-MM-yyyy")
                  : "NA"}
              </span>
            </div>
          </div>
          <div className="uk-width-1-3@m">
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">
                Quantidade abastecida :
              </p>
              <span>{supply ? supply.liters_supplied : "NA"} Litros</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Valor</p>
              <span>{supply ? supply.value_supplied : "NA"} Meticais</span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Quantidade gasta:</p>
              <span>
                {supply ? supply.liters_spent.toFixed(1) : "NA"} Litros
              </span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Requisitante</p>
              <span>{supply ? supply.requestor : "NA"} </span>
            </div>
            <div className="uk-margin-small-bottom">
              <p className="uk-margin-small uk-text-bold">Data de registro:</p>
              <span>
                {supply
                  ? format(new Date(supply.createdAt), "dd-MM-yyyy")
                  : "NA"}
              </span>
            </div>
          </div>
          {/* <hr class="uk-divider-vertical"/> */}
          {supply ? (
            <div className="uk-width-1-3@m">
              <p className="uk-uk-text-bold uk-text-muted uk-text-medium">
                Mais detalhes do veículo
              </p>

              <dl className="uk-description-list">
                <div className="uk-margin-small-bottom ">
                  <dt className="uk-text-normal">
                    <p className="uk-margin-remove uk-text-bold">Cilindada</p>
                    {supply ? supply.car.engine : ""}
                  </dt>
                  <dd className="uk-margin-small">
                    <p className="uk-margin-remove uk-text-bold">
                      Capacidade Máxima
                    </p>
                    {supply ? supply.car.maximum + "Litros" : ""}
                  </dd>
                  <a
                    href={`/cars/${supply.car.id}`}
                    className="uk-margin-left uk-button-link"
                  >
                    Veículo <span uk-icon="chevron-right"></span>
                  </a>
                </div>
              </dl>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function SupplyDetails() {
  return <Layout header={<Header />} content={<Supply />} aside={<Aside />} />;
}
