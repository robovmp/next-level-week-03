import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import mapMarkerImg from "../../assets/images/logoReduce.svg";
import "./styles.css";

import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <aside className="appSidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
