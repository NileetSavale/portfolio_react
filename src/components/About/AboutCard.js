import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Nileet Savale </span>
            from <span className="purple"> Maharashtra, India.</span>
            <br />
            I am currently pursuing, Master of Science in Computer Science from Indiana University, Bloomington.
            <br />
            I have completed Bachelor of engineering from AISSMS IOIT, Pune
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight />  Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight />  Cooking
            </li>
            <li className="about-activity">
              <ImPointRight />  Travelling
            </li>
            <li className="about-activity">
              <ImPointRight />  Drinking Coffee 
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Nothing compared to a nice hot Latte"{" "}
          </p>
          <footer className="blockquote-footer">Nileet</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
