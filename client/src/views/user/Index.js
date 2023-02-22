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

function User() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const messageAlert = location.state ? location.state.messageAlert : "";

  useEffect(() => {
    instance
      .get("/users")
      .then(function(response) {
        setUsers(response.data.data);
        setFilteredData(response.data.data);

      })
      .catch(function(error) {
        if (error.response) {
          setError(error.response.data);
        }
      });
  }, []);

  useEffect(() => {}, [users, error]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle filtering
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = users.filter((item) => {
      return (
        (typeof item.registration === "string" &&
          item.registration.toLowerCase().includes(query)) ||
        (typeof item.engine === "string" &&
          item.engine.toLowerCase().includes(query))
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
          <a href="">Usuários</a>
        </li>
        <li>
          <a href=""></a>
        </li>
      </ul>

      <h3 className="uk-heading-bullet uk-text-bold">Usuários</h3>
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
      <table className="uk-table uk-table-striped uk-border-rounded uk-userd-default">
        <thead>
          <tr className="uk-text-left">
            <th className="uk-text-align-left">Nome</th>
            <th>Email</th>
            <th>Previlégio</th>
            <th>Usuário desde</th>
            <th>Opção</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user ? user.roles[0].description  : ""}</td>
                <td>{format(new Date(user.createdAt), "dd-MM-yyyy")}</td>
                <td>
                  <a href={'/users/' + user.id}  className="uk-button uk-button-small uk-button-primary">Ver</a>
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

export default function UserIndex() {
  return (
    <Layout header={<Header />} content={<User />} aside={<Aside />} />
  );
}
