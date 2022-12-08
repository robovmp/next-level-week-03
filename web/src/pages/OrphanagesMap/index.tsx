import React, { useEffect, useState } from "react";
import "./styles.css";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import mapMarkerImg from "../../assets/images/logoReduce.svg";
import "leaflet/dist/leaflet.css";
import api from "../../plugins/api";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [172, -4],
});

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="pageMap">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita.</p>
        </header>

        <footer>
          <strong>Santo Antônio da Platina</strong>
          <span>Paraná</span>
        </footer>
      </aside>
      <MapContainer
        center={[-23.3016673, -50.0909471]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <Link to="/orphanages/create" className="createOrphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
