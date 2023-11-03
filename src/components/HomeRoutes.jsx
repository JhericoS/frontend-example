import React from "react";
import { Routes, Route } from "react-router-dom";
import Productos from "./Productos";
import NuevoProducto from "../forms/product/NuevoProducto";
import EditarProducto from "../forms/product/EditarProducto";
import CardProduct from "./CardProduct";
import Dashboard from "./Dashboard";
import Resources from "./Resources";
import Contact from "./Contact";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Productos />} />
      <Route path="/inventory/nuevo-producto" element={<NuevoProducto />} />
      <Route path="/inventory/editar-producto/:id" element={<EditarProducto />} />
      <Route path="/inventory/card-product/:id" element={<CardProduct />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default HomeRoutes;
