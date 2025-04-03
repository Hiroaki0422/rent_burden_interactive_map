import React from "react";
import "./Legend.css";

const Legend = () => {
  return (
    <div className="legend">
      <div style={{ "--color": "#800026" }}> 45+% </div>
      <div style={{ "--color": "#BD0026" }}> 43.3 - 45%</div>
      <div style={{ "--color": "#E31A1C" }}> 40.1 - 43.2% </div>
      <div style={{ "--color": "#FC4E2A" }}> 38.5 - 40.0%</div>
      <div style={{ "--color": "#FD8D3C" }}> 36.2 - 38.5%</div>
      <div style={{ "--color": "#FEB24C" }}> 33.6 - 36.1%</div>
      <div style={{ "--color": "#FED976" }}> 28.2 - 33.5%</div>
      <div style={{ "--color": "#FFEDA0" }}> - 28.2%</div>
      <div style={{ "font-size": "0.8em" }}>
        of renters spend more than 30% of paycheck
      </div>
    </div>
  );
};
export default Legend;
