import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/nav";
import "./SalesHistoryOption.css";
import Calendar from "react-calendar";
import Modal from "./Modal.jsx";

const BASE_URL = import.meta.env.PROD ? "" : "http://localhost:8000";

function SalesHistoryOption() {
  const [buys, setBuys] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onClickDate, setOnClickDate] = useState(null);

  const parsearFecha = (fechaString) => {
    // "04/05/2026 01:18"
    const [fecha, hora] = fechaString.split(" ");
    const [dia, mes, año] = fecha.split("/");
    const [horas, minutos] = hora.split(":");
    return new Date(año, mes - 1, dia, horas, minutos);
  };

  function handleModal(date) {
    setOnClickDate(true);
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/sales/date/${date}`);

        console.log("RESPUESTA DE LA API: ", response.data);

        if (!response.data || response.data.length === 0) {
          setBuys([]);
        }

        const formattedSales = response.data.map((sale) => {
          sale.created_at = parsearFecha(sale.created_at);
          return sale;
        });

        setBuys(formattedSales);
      } catch (err) {
        setError("Error al cargar las ventas.", err);
      } finally {
        setLoading(false);
      }
    };
  }

  return (
    <section className="option-panel">
      <Nav />
      <div className="option-form">
        <div className="box-title">
          <h2 className="title">Historial de ventas</h2>
          <p className="description">
            Consulta las ventas ya cerradas y revisa el detalle de cada ticket.
          </p>
        </div>

        <Calendar
          className="history-calendar"
          onClickDay={handleModal}
          value={new Date()}
        ></Calendar>
        {onClickDate && (
          <Modal loading={loading} error={error} buys={buys}></Modal>
        )}
      </div>
    </section>
  );
}

export default SalesHistoryOption;
