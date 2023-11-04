import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const CardProduct = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
    genderId: "",
    brandId: "",
    rating: 0,
    image: "",
  });

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

    const fetchProduct = async () => {
      try {
        const producto = await fetchData(
          `https://fitsterupcapi.azurewebsites.net/api/v1/products/${id}`
        );
        setProduct(producto);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Función para manejar la selección de tallas
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(product.rating * 2) / 2; // Redondea al valor más cercano con estrellas enteras y media estrella
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon icon={faStarHalf} key={fullStars} />);
    }

    return stars;
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
          <img
            src={product.image}
            alt={product.name}
            className="h-64 rounded-lg mb-4"
          />
        </div>
        <div className="w-1/2 p-4 font-semibold">
          <div className="font-bold text-2xl mb-2">{product.name}</div>
          <div className="text-2xl mb-2">
            $
            {parseFloat(product.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          <div className="flex space-x-2 mb-4 items-center text-yellow-400">
            {renderStars()}
            <span className="ml-2 text-black">{product.rating}</span>
          </div>
          <div className="text-base mb-4">
            <div>About the Product:</div>
            <div className="font-normal">{product.description}</div>
          </div>
          <div className="text-base">
            Category: <span className="font-normal">{product.categoryId}</span>
            <br />
            Type: <span className="font-normal">{product.genderId}</span>
            <br />
            Brand: <span className="font-normal">{product.brandId}</span>
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
              Stock {selectedSize}: {product.stock}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
