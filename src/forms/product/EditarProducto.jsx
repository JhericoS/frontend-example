import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarProducto = () => {
  // Registros
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const [puestos, setPuestos] = useState([]);
  // Valores
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [subarea, setSubarea] = useState("");
  const [puesto, setPuesto] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

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

    const fetchAreas = async () => {
      const areasData = await fetchData(
        "https://squid-app-vvma9.ondigitalocean.app/api/areas"
      );
      setAreas(areasData.docs);
    };

    const fetchSubareas = async (areaSeleccionada) => {
      const areasData = await fetchData(
        "https://squid-app-vvma9.ondigitalocean.app/api/areas"
      );
      const selectedArea = areasData.docs.find(
        (area) => area.name === areaSeleccionada
      );
      const subareasData = selectedArea ? selectedArea.subarea : [];
      setSubareas(subareasData);
    };

    const fetchPuestos = async (areaSeleccionada, subareaSeleccionada) => {
      const areasData = await fetchData(
        "https://squid-app-vvma9.ondigitalocean.app/api/areas"
      );
      const selectedArea = areasData.docs.find(
        (area) => area.name === areaSeleccionada
      );
      const subareaData = selectedArea
        ? selectedArea.subarea.find((p) => p.name === subareaSeleccionada)
        : null;
      const puestosData = subareaData ? subareaData.puesto : [];
      setPuestos(puestosData);
    };

    const fetchProducto = async () => {
      try {
        const producto = await fetchData(
          `https://squid-app-vvma9.ondigitalocean.app/api/productos/${id}`
        );
        setName(producto.name || "");
        setEmail(producto.email || "");
        await fetchAreas();
        setArea(producto.area || "");
        await fetchSubareas(producto.area);
        setSubarea(producto.subarea || "");
        await fetchPuestos(producto.area, producto.subarea);
        setPuesto(producto.puesto || "");
        setBirthday(producto.birthday || "");
        setPassword(producto.password || "");
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

  const handleTogglePasswordChange = () => {
    setChangePassword(!changePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedPassword = password; // Keep the current password if the user doesn't want to change it
      if (changePassword && password.trim() !== "") {
        updatedPassword = password;
      }
      const response = await axios.put(
        `https://squid-app-vvma9.ondigitalocean.app/api/productos/${id}`,
        {
          name,
          email,
          area,
          subarea,
          puesto,
          birthday,
          password: updatedPassword,
        }
      );

      const productoActualizado = response.data;
      console.log("Producto actualizado:", productoActualizado);
      navigate("/home/productos");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Editar Producto</h2>
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
              Subarea
            </label>
            <select
              type="subarea"
              id="subarea"
              value={subarea}
              onChange={handleSubareaChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
              Puesto
            </label>
            <select
              type="puesto"
              id="puesto"
              value={puesto}
              onChange={handlePuestoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
              Contraseña
            </label>
            <div className="mb-4">
              <button
                type="button"
                className={`px-3 py-1 bg-${
                  changePassword ? "red-500" : "green-500"
                } rounded text-white`}
                onClick={handleTogglePasswordChange}
              >
                {changePassword ? "Cancelar Cambio" : "Cambiar contraseña?"}
              </button>
            </div>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border ${
                changePassword ? "block" : "hidden"
              } border-gray-300 rounded focus:outline-none focus:border-blue-500`}
              disabled={!changePassword}
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProducto;
