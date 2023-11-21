import React, { useState } from "react";

function Resources() {
  const [selectedTable, setSelectedTable] = useState("Brand");

  const tables = {
    Brand: ["Adidas", "Nike", "Levi's", "Calvin Klein", "Gucci", "Ralph Lauren", "Puma", "Tommy Hilfiger", "Under Armour", "Gap"],
    Type: ["Men", "Women", "Kids"],
    Category: ["T-Shirt", "Pants", "Dress", "Jeans", "Shirt", "Blouse", "Sweater", "Jacket", "Hoodie", "Short"],
  };

  return (
    <div className="w-full flex flex-col p-4">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Resources</h1>
      </div>
      <div className="flex flex-col mx-auto w-full max-w-2xl">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedTable("Brand")}
            className={`${
              selectedTable === "Brand" ? "bg-gray-800 text-white" : ""
            } px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-800 hover:text-white`}
          >
            Brand
          </button>
          <button
            onClick={() => setSelectedTable("Type")}
            className={`${
              selectedTable === "Type" ? "bg-gray-800 text-white" : ""
            } px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-800 hover:text-white`}
          >
            Type
          </button>
          <button
            onClick={() => setSelectedTable("Category")}
            className={`${
              selectedTable === "Category" ? "bg-gray-800 text-white" : ""
            } px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-800 hover:text-white`}
          >
            Category
          </button>
        </div>
        <table className="w-full border-collapse mt-4">
          <thead className="bg-zinc-600 text-white">
            <tr>
              <th className="p-2">Item Name</th>
            </tr>
          </thead>
          <tbody>
            {tables[selectedTable].map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-zinc-100" : "bg-white"}`}
              >
                <td className="border border-gray-300 p-2 font-semibold">
                  {item}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resources;
