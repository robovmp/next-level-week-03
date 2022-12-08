import React, { ChangeEvent, FormEvent, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from "../../assets/images/logoReduce.svg";

import SideBar from "../../components/SideBar";
import "./styles.css";
import api from "../../plugins/api";
import { useNavigate } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

export default function CreateOrphanage() {
  const navigate = useNavigate();

  const [selectedPosition, setSelectedPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function HandleMapClick() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;

        setSelectedPosition({
          latitude: lat,
          longitude: lng,
        });
      },
    });

    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { latitude, longitude } = selectedPosition;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("openingHours", openingHours);
    data.append("openOnWeekends", String(openOnWeekends));
    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("/orphanages", data);

    alert("Cadastro realizado com sucesso!");

    navigate("/app");
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-23.3016673, -50.0909471]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <HandleMapClick />
              {selectedPosition.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[
                    selectedPosition.latitude,
                    selectedPosition.longitude,
                  ]}
                />
              )}
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={name} />;
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectedImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
