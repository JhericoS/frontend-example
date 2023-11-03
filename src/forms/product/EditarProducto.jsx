import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarProducto = () => {
  // Valores
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const fetchProducto = async () => {
      try {
        const producto = await fetchData(
          `https://fitsterupcapi.azurewebsites.net/api/v1/products/${id}`
        );
        setName(producto.name || "");
        setPrice(producto.price || "");
        setStock(producto.stock || "");
        setCategory(producto.category || "");
        setType(producto.type || "");
        setBrand(producto.brand || "");
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://squid-app-vvma9.ondigitalocean.app/api/productos/${id}`,
        {
          name,
          price,
          stock,
          category,
          type,
          brand,
        }
      );

      const productoActualizado = response.data;
      console.log("Producto actualizado:", productoActualizado);
      navigate("/home/inventory");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setErrorMessage("Error al actualizar el producto");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex my-4">
        <Link
          to="/home/inventory"
          className="mx-2 px-4 py-2 rounded-lg bg-zinc-400"
        >
          Volver
        </Link>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-center font-semibold text-3xl mb-4">
          Editar Producto
        </h2>
        {errorMessage && (
          <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#3a3a3a] rounded text-white"
            >
              Guardar
            </button>
          </div>
          <div className="flex gap-8">
            <div className="mb-4 md:w-1/3">
              <label htmlFor="name" className="block mb-2">
                Nombre <span className=" text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4 md:w-1/3">
              <label htmlFor="price" className="block mb-2">
                Precio <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4 md:w-1/3">
              <label htmlFor="area" className="block mb-2">
                Stock <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={handleStockChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mb-2 md:w-1/3">
              <label htmlFor="category" className="block mb-2">
                Imágenes
              </label>
              <div className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                <label
                  htmlFor="image-upload"
                  className="text-xl text-gray-600 hover:text-blue-500"
                >
                  <span className="text-3xl font-bold mr-2">+</span> Añadir
                  imagen
                </label>
                <input type="file" id="image-upload" className="hidden" />
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mb-4 md:w-1/3">
              <label htmlFor="category" className="block mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Seleccionar category</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Pants">Pants</option>
                <option value="Shorts">Shorts</option>
                <option value="Jacket">Jacket</option>
                <option value="Dress">Dress</option>
                <option value="Tank Top">Tank Top</option>
              </select>
            </div>

            <div className="mb-4 md:w-1/3">
              <label htmlFor="type" className="block mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                value={type}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Seleccionar type</option>
                <option value="Men">Men</option>
                <option value="Momen">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="mb-4 md:w-1/3">
              <label htmlFor="brand" className="block mb-2">
                Brand <span className=" text-red-500">*</span>
              </label>
              <select
                type="text"
                id="brand"
                value={brand}
                onChange={handleBrandChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Seleccionar brand</option>
                <option value="Adidas">Adidas</option>
                <option value="Nike">Nike</option>
                <option value="Puma">Puma</option>
                <option value="Fila">Fila</option>
                <option value="Gucci">Gucci</option>
              </select>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mb-2 md:w-1/3">
              <label htmlFor="category" className="block mb-2">
                3D Model
              </label>
              <div className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                <label
                  htmlFor="image-upload"
                  className="text-xl text-gray-600 hover:text-blue-500"
                >
                  <span className="text-3xl font-bold mr-2">+</span> Añadir
                  modelo
                </label>
                <input type="file" id="image-upload" className="hidden" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProducto;
