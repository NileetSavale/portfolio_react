import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import GitHubProfileButton from "./GitHubProfileButton";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/Smart-dustbin.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Smart Dustbin"
              description="Developed a Smart-dustbin, with multiple sensors to help in easy garbage collection and segregration of the type of garbage. It uses DHT for humidity checking and ultrasonic sensor for level of garbage."
              ghLink="https://github.com/NileetSavale/Smart-Dustbin"
              demoLink="https://smart-dustbin-50eec.web.app/"
            />
          </Col>

        </Row>
        <GitHubProfileButton />
      </Container>
    </Container>
  );
}

export default Projects;
