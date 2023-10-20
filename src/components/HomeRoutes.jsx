import React from "react";
import { Routes, Route } from "react-router-dom";
import Productos from "./Productos";
import NuevoProducto from "../forms/product/NuevoProducto";
import EditarProducto from "../forms/product/EditarProducto";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Productos />} />
      <Route path="/nuevo-producto" element={<NuevoProducto />} />
      <Route path="/editar-producto/:id" element={<EditarProducto />} />
    </Routes>
  );
};

export default HomeRoutes;
