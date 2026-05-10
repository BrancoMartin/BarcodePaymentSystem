import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.PROD ? "" : "http://localhost:8000";

function Modal({ loading, error, buys }) {
  console.log("LOADING: ", loading);
  console.log("ERROR: ", error);
  console.log("BUYS: ", buys);

  console.log("Tipo de buys:", typeof buys, Array.isArray(buys));

  return (
    <div>
      {loading ? (
        <p>Cargando ventas...</p>
      ) : buys.length === 0 ? (
        <p>No hay ventas registradas aún.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Productos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {buys.length == 0 && (
              <tr>
                <td colSpan="5">No hay ventas registradas aún.</td>
              </tr>
            )}
            {buys.length != 0 &&
              buys.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.created_at}</td>
                  <td>{sale.total_price}</td>
                  <td>
                    {sale.items.map((item) => (
                      <p>
                        {item.product_name} - {item.quantity}
                      </p>
                    ))}
                  </td>
                  <td>{sale.state}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Modal;
