import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { Header } from "../../components/layout/HeaderTab";
import { format } from "date-fns";

import { Aside } from "../../components/layout/AsideTab";
import instance from "../../config/AxiosConfig";
import { useLocation } from "react-router-dom";
import Pagination from "../../config/Pagination";

function SupplyPage() {
  const [supplies, setSupplies] = useState([]);
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const messageAlert = location.state ? location.state.messageAlert : "";

  useEffect(() => {
    instance
      .get("/supplies")
      .then(function(response) {
        setSupplies(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  }, []);

  useEffect(() => {}, [supplies, error]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle filtering
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = supplies.filter((item) => {
      return (
        (typeof item.registration === "string" &&
          item.registration.toLowerCase().includes(query)) ||
        (typeof item.engine === "string" &&
          item.engine.toLowerCase().includes(query)) ||
        (typeof item.category.name === "string" &&
          item.category.name.toLowerCase().includes(query))
      );
    });
    setFilteredData(filtered);
  };

  // Function to handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the data to only show the items on the current page
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Generate an array of page numbers for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    // reset the current page to 1 whenever the filtered data changes
    setCurrentPage(1);
  }, [filteredData]);

  return (
    <div>
      <ul className="uk-breadcrumb">
        <li>
          <a href="">Abastecimentos</a>
        </li>
        <li>
          <a href=""></a>
        </li>
      </ul>

      <h3 className="uk-heading-bullet uk-text-bold">Abastecimentos</h3>
      {error.message ? (
        <div className="uk-alert-danger uk-margin-medium-left" uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          <p className="uk-margin-left">{error.message}</p>
        </div>
      ) : (
        ""
      )}
      <input
        className="uk-align-right uk-input uk-width-1-4@m"
        type="text"
        placeholder="Pesquisar..."
        // value={searchQuery}
        onChange={handleFilter}
      />
      <table className="uk-table uk-table-striped uk-border-rounded uk-supplyd-default">
        <thead>
          <tr className="uk-text-left">
            <th className="uk-text-align-left">Cod. Primavera</th>
            <th>Dia</th>
            <th>KM Percorida</th>
            <th>Litros</th>
            <th>Valor</th>
            <th>Requisitante</th>
            <th>Viatura</th>
            <th>Opção</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply, index) => {
            return (
              <tr key={index}>
                <td>{supply.primavera_id}</td>
                <td>{format(new Date(supply.requested_date), "dd-MM-yyyy")}</td>
                <td>{supply.km_traveled}</td>
                <td>{supply.liters_supplied}</td>
                <td>{supply.value_supplied}</td>
                <td>{supply.requestor}</td>
                <td>{supply.car.registration}</td>
                <td>
                  <a
                    href={"/supplies/" + supply.id}
                    className="uk-button  uk-button-small  uk-button-primary"
                  >
                    Ver
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr className="uk-margin-small-left uk-margin-remove-bottom" />
      {filteredData.length > itemsPerPage && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default function SupplyIndex() {
  return (
    <Layout header={<Header />} content={<SupplyPage />} aside={<Aside />} />
  );
}
