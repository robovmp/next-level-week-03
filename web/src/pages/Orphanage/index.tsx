import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useParams } from "react-router-dom";

import mapMarkerImg from "../../assets/images/logoReduce.svg";

import SideBar from "../../components/SideBar";
import "./styles.css";
import api from "../../plugins/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface IOrphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function Orphanage() {
  const params = useParams();
  const [orphanage, setOrphange] = useState<IOrphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphange(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <h1>Carregando...</h1>;
  }
  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  key={image.id}
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </MapContainer>

              <footer>
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.openingHours}
              </div>
              {orphanage.openOnWeekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dontOpen">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
