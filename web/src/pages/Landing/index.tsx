import React from "react";
import "./styles.css";
import logo from "../../assets/images/Logo.svg";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div id="pageLanding">
      <div className="contentWrapper">
        <img src={logo} alt="Happy" />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Santo Antônio da Platina</strong>
          <span>Paraná</span>
        </div>
        <Link to="/app" className="enterApp">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
