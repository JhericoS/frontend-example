import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaMinus, FaPencilAlt } from "react-icons/fa";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const registrosPerPage = 10;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "https://squid-app-vvma9.ondigitalocean.app/api/productos",
          {
            params: {
              limit: 1000,
            },
          }
        );
        const data = response.data.docs;
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductos();
  }, []);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const handleDelete = async (productoId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );

    if (confirmed) {
      try {
        await axios.delete(
          `https://squid-app-vvma9.ondigitalocean.app/api/productos/${productoId}`
        );
        const updatedProductos = productos.filter(
          (producto) => producto._id !== productoId
        );
        setProductos(updatedProductos);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const filteredRegistros = productos.filter((producto) => {
    const searchTermLower = searchTerm.toLowerCase();
    return producto.name?.toLowerCase().includes(searchTermLower);
  });

  const pageCount = Math.ceil(filteredRegistros.length / registrosPerPage);
  const offset = pageNumber * registrosPerPage;
  const currentRegistros = filteredRegistros.slice(
    offset,
    offset + registrosPerPage
  );

  return (
    <div className="w-full flex flex-col md:mt-12">
      <div className="flex mx-auto w-full max-w-7xl">
        <div className="w-full mb-8 mx-4 md:mx-8">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex md:hidden px-4 md:px-8">
        <table className="w-full max-w-max mx-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-800 p-2">Registros</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistros.map((producto, index) => (
              <tr
                key={producto.id}
                className={`${index % 2 === 0 ? "bg-zinc-100" : "bg-white"}`}
              >
                <td className="border px-6 flex items-start justify-start border-gray-300 p-2">
                  <div className="flex flex-wrap">
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Item Name:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.name}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Category:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.category}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Type:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.type}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Brand:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.brand}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Price:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.price}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Stock:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.stock}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Image:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.image}</p>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                      <p className="font-semibold">Model 3D:</p>
                    </div>
                    <div className="w-1/2 md:w-3/4">
                      <p>{producto.model}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hidden md:flex max-w-7xl mx-auto w-full md:flex-col px-8">
        <div className="flex justify-start items-center">
          <div className="mb-4">
            <Link
              to="/home/nuevo-producto"
              className="block px-4 py-2 text-sm  hover:bg-[#ff6400] bg-zinc-600 text-white"
              role="menuitem"
            >
              Add Product
            </Link>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-zinc-600 text-white">
            <tr>
              <th className="p-2">Item Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Image</th>
              <th className="p-2">Model 3D</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistros.map((producto, index) => {
              return (
                <tr
                  key={producto.id}
                  className={`${index % 2 === 0 ? "bg-zinc-100" : "bg-white"}`}
                >
                  <td className="border border-gray-300 p-2">
                    {producto.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.type}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.brand}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.price}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.stock}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.image}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {producto.model}
                  </td>
                  <td className="border font-semibold border-gray-300 p-2">
                    <Link to={`/home/editar-producto/${producto.id}`}>
                      <button className="h-6 w-6 text-green-700 font-bold items-center justify-center bg-green-200  rounded-full">
                        <FaPencilAlt className="mx-auto h-3 w-3" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="mx-2 h-6 w-6 text-red-700 font-bold items-center justify-center bg-red-200 rounded-full"
                    >
                      <FaMinus className="mx-auto h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="flex items-center justify-center mt-4"
          pageClassName="cursor-pointer mx-2"
          previousClassName="cursor-pointer mx-2"
          nextClassName="cursor-pointer mx-2"
          activeClassName="bg-[#4d4d4d] text-white rounded-lg px-3 py-1"
          disabledClassName="text-gray-500 cursor-not-allowed mx-2"
          previousLinkClassName="pagination-link"
          nextLinkClassName="pagination-link"
          pageLinkClassName="pagination-link"
          activeLinkClassName="pagination-link-active"
        />
      </div>
    </div>
  );
}

export default Productos;
