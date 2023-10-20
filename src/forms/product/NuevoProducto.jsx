import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NuevoProducto = () => {
  // Registros
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [puestos, setPuestos] = useState([]);
  // Valores
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [subarea, setSubarea] = useState("");
  const [puesto, setPuesto] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [first, setFirst] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          "https://squid-app-vvma9.ondigitalocean.app/api/productos"
        );
        const data = response.data.docs;
        setAreas(data);
        setFirst(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (!first) {
      fetchAreas();
    }
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAreaChange = (e) => {
    const areaSeleccionada = e.target.value;
    setArea(areaSeleccionada);

    const areaEncontrada = areas.find((area) => area.name === areaSeleccionada);
    if (areaEncontrada) {
      setSubarea("");
      setSubareas(areaEncontrada.subarea);
      setPuesto("");
      setPuestos([]);
    } else {
      setSubarea("");
      setSubareas([]);
      setPuesto("");
      setPuestos([]);
    }
  };

  const handleSubareaChange = (e) => {
    const subareaSeleccionada = e.target.value;
    setSubarea(subareaSeleccionada);

    const subareaEncontrada = subareas.find(
      (subarea) => subarea.name === subareaSeleccionada
    );
    if (subareaEncontrada) {
      setPuesto("");
      setPuestos(subareaEncontrada.puesto);
    } else {
      setPuesto("");
      setPuestos([]);
    }
  };

  const handlePuestoChange = (e) => {
    setPuesto(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://squid-app-vvma9.ondigitalocean.app/api/productos",
        {
          name,
          email,
          area,
          subarea,
          puesto,
          birthday,
          password,
        }
      );

      const nuevoProducto = response.data;
      console.log("Producto añadido:", nuevoProducto);
      navigate("/home/productos");
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      setErrorMessage("El correo ya existe");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Añadir Producto</h2>
        {errorMessage && (
          <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Correo Electrónico <span className=" text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="area" className="block mb-2">
              Area <span className=" text-red-500">*</span>
            </label>
            <select
              type="area"
              id="area"
              value={area}
              onChange={handleAreaChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Seleccionar area</option>
              {areas.map((area) => (
                <option key={area.id} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subarea" className="block mb-2">
              Subarea <span className=" text-red-500">*</span>
            </label>
            <select
              type="subarea"
              id="subarea"
              value={subarea}
              onChange={handleSubareaChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Seleccionar subarea</option>
              {subareas.map((subarea) => (
                <option key={subarea.id} value={subarea.name}>
                  {subarea.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="puesto" className="block mb-2">
              Puesto <span className=" text-red-500">*</span>
            </label>
            <select
              type="puesto"
              id="puesto"
              value={puesto}
              onChange={handlePuestoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Seleccionar puesto</option>
              {puestos.map((puesto) => (
                <option key={puesto.id} value={puesto.name}>
                  {puesto.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="birthday" className="block mb-2">
              Cumpleaños <span className=" text-red-500">*</span>
            </label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={handleBirthdayChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Contraseña <span className=" text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <Link
              to="/home"
              type="button"
              className="px-4 py-2 mr-2 bg-gray-200 rounded"
              onClick={() => {
                console.log("Cancelado");
              }}
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ff6400] rounded text-white"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoProducto;
