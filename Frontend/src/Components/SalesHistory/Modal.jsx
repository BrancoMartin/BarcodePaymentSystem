import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.PROD ? "" : "http://localhost:8000";

function Modal({ date }) {
  const [history, setHistory] = useState([]);
  const [buys, setBuys] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parsearFecha = (fechaString) => {
    // "04/05/2026 01:18"
    const [fecha, hora] = fechaString.split(" ");
    const [dia, mes, año] = fecha.split("/");
    const [horas, minutos] = hora.split(":");
    return new Date(año, mes - 1, dia, horas, minutos);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/sales/date/${date}`);

        console.log("RESPUESTA DE LA API: ", response.data.created_at);

        const formattedSales = response.data.map((sale) => {
          sale.created_at = parsearFecha(sale.created_at);
          return sale;
        });

        setBuys(formattedSales);
        setHistory(formattedSales);
      } catch (err) {
        setError("Error al cargar las ventas.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  console.log("HISTORIAL DE VENTAS: ", buys);

  return (
    <div>
      {loading ? (
        <p>Cargando ventas...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : history.length === 0 ? (
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
            {buys.map((sale) => (
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
