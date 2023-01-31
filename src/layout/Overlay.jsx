import React from "react";
import "./style.css";
import BananaImage from "../image/bananaBanner.png";

export default function Overlay() {
  return (
    <div className="container">
      <section className="top-left">
        <h1>Banana</h1>
        <img src={BananaImage} alt="Banana Logo" />
        <p>In React & React Three Fiber</p>
      </section>
      <div className="bottom-left">
        Created by{" "}
        {/* <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="my-name"
        >
          Humayun Kamal
        </a> */}
        <span style={{ color: "white" }}>Humayun Kamal</span>
      </div>
      <div className="bottom-right">
        Inspiration and ideas
        <br />
        Fundamentals
        <br />
        Finding models
        <br />
        Preparing them for the web
        <br />
        Displaying and changing models
        <br />
        Animation fundamentals
        <br />
        Effects and making things look good
        <br />
        Performance and time to load
        <br />
      </div>
    </div>
  );
}
