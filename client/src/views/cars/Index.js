import React from "react";
import { Aside } from "../../components/layout/AsideTab";
import { Header } from "../../components/layout/HeaderTab";
import { Layout } from "../../components/layout/Layout";
import { useState } from "react";
import { useEffect } from "react";
import instance from "../../config/AxiosConfig";
import { useLocation } from "react-router-dom";
import Pagination from "../../config/Pagination";

function CarPage() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState({});
  const location = useLocation();
  const messageAlert = location.state ? location.state.messageAlert : "";
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    instance
      .get("/cars")
      .then(function(response) {
        setCars(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  }, []);

  useEffect(() => {}, [cars, error]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle filtering
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = cars.filter((item) => {
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
          <a href="">Veículos</a>
        </li>
        <li>
          <a href=""></a>
        </li>
      </ul>

      <h3 className="uk-heading-bullet uk-text-bold">Veículos</h3>
      {error.message ? (
        <div className="uk-alert-danger uk-margin-small-left" uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          <p className="uk-margin-left">{error.message}</p>
        </div>
      ) : (
        ""
      )}
      {messageAlert ? (
        <div className="uk-alert-success uk-margin-small-left" uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          <p className="uk-margin-left">{messageAlert}</p>
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
      <table className="uk-table uk-table-striped uk-border-rounded uk-card-default uk-margin-small-left">
        <thead>
          <tr className="uk-text-left">
            <th className="uk-text-align-left">Matrícula</th>
            <th>Cilindrada</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Opção</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car, index) => {
            return (
              <tr key={index}>
                <td>{car.registration}</td>
                <td>{car.engine}</td>
                <td>{car.category.name}</td>
                <td>{car.type}</td>
                <td>
                  <a
                    href={"/cars/" + car.id}
                    className="uk-button uk-button-small uk-button-primary"
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

export default function CarIndex() {
  return <Layout header={<Header />} content={<CarPage />} aside={<Aside />} />;
}
