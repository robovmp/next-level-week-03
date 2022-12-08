import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";
import OrphanagesMap from "./pages/OrphanagesMap";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<OrphanagesMap />} />
        <Route path="/orphanages/create" element={<CreateOrphanage />} />
        <Route path="/orphanages/:id" element={<Orphanage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
