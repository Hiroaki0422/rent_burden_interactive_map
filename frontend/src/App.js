import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import seg from "./seg.json";
import { useRef, useState } from "react";
import Legend from "./Legend";

function getColor(d) {
  return d > 0.45
    ? "#800026"
    : d > 0.43316
    ? "#BD0026"
    : d > 0.409942
    ? "#E31A1C"
    : d > 0.385714
    ? "#FC4E2A"
    : d > 0.36255
    ? "#FD8D3C"
    : d > 0.337906
    ? "#FEB24C"
    : d > 0.281362
    ? "#FED976"
    : "#FFEDA0";
}
export default function App() {
  const geoJsonRef = useRef();
  const [onselect, setOnselect] = useState({});
  /* function determining what should happen onmouseover, this function updates our state*/
  const highlightFeature = (e) => {
    var layer = e.target;
    const test = e.target.feature.properties.COUNTY_STATE_CODE;
    console.log(test);
    setOnselect({
      name: e.target.feature.properties.COUNTY_STATE_CODE,
      rent_burden: e.target.feature.properties.renter_burdend,
      rent_severe_burden: e.target.feature.properties.renter_severe_burdend,
      renter_surveyed: e.target.feature.properties.renter_population,
    });

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    layer.bringToFront();
  };
  /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
  const resetHighlight = (e) => {
    setOnselect({});
    e.target.setStyle(style(e.target.feature));
  };

  const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
  };
  /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };
  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.renter_burdend),
      weight: 0.5,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };
  return (
    <MapContainer center={[37.8, -96]} zoom={4}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {onselect.name && (
        <ul className="census-info">
          <li>
            <strong>{onselect.name}</strong>
          </li>
          <br />
          <li>
            Out of <strong>{onselect.renter_surveyed}</strong> renters surveyed
          </li>
          <li>
            <strong>{Math.round(onselect.rent_burden * 10000) / 100}</strong>%
            of people spend more than <strong>30%</strong> of income <br />
          </li>
          <li>
            <strong>
              {Math.round(onselect.rent_severe_burden * 10000) / 100}
            </strong>
            % of people spend more than <strong>50%</strong> of income <br />
          </li>
        </ul>
      )}
      <Legend />
      <GeoJSON
        ref={geoJsonRef}
        data={seg}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
