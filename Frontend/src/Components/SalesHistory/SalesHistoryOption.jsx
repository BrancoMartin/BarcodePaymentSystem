import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/nav";
import "./SalesHistoryOption.css";
import Calendar from "react-calendar";
import { Modal } from "react-native-web";

const BASE_URL = import.meta.env.PROD ? "" : "http://localhost:8000";

function SalesHistoryOption() {
  const [date, setDate] = useState(new Date());

  function handleModal(date) {
    setDate(date);
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
          value={date}
        ></Calendar>
        <Modal date={date}></Modal>
      </div>
    </section>
  );
}

export default SalesHistoryOption;
