import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CardProduct = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

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
          `https://squid-app-vvma9.ondigitalocean.app/api/productos/${id}`
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

  // Función para manejar la selección de tallas
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="mx-auto flex flex-col">
      <div className="flex my-4">
        <Link
          to="/home/inventory"
          className="mx-2 px-4 py-2 rounded-lg bg-zinc-400"
        >
          Volver
        </Link>
      </div>
      <div className="max-w-4xl flex w-full mx-auto">
        <div className="w-1/2 p-4">
          {/* Imágenes (reemplaza con tus imágenes reales) */}
          <div className="bg-gray-800 h-64 rounded-lg mb-4"></div>
          <div className="bg-gray-800 h-64 rounded-lg"></div>
        </div>
        <div className="w-1/2 p-4">
          <div className="font-bold text-2xl mb-2">{name}</div>
          <div className="text-2xl mb-2">
            $
            {parseFloat(price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          <div className="flex space-x-2 mb-4">
            {/* Iconos de estrellas (reemplaza con tus iconos reales) */}
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
          </div>
          <div className="text-base mb-4">About the Product:</div>
          <div className="text-base">
            Category: {category}
            <br />
            Type: {type}
            <br />
            Brand: {brand}
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold mb-2">Select Size:</div>
            <div className="flex space-x-4">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } p-2 rounded-full focus:outline-none`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {selectedSize && (
            <div className="text-base">
              Stock {selectedSize}: {stock}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
