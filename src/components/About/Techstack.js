import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap"; // Added Tooltip import
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import { SiGooglecloud, SiFirebase, SiSolidity,SiSelenium, } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const TooltipWithRef = React.forwardRef((props, ref) => (
  <Tooltip ref={ref} {...props}>
    {props.children}
  </Tooltip>
));

const renderTooltip = (props, name) => (
  <TooltipWithRef id="button-tooltip" {...props}>
    {name}
  </TooltipWithRef>
);

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "C++")}
        >
          <div>
            <CgCPlusPlus />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "JavaScript")}
        >
          <div>
            <DiJavascript1 />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Google Cloud")}
        >
          <div>
            <SiGooglecloud />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Node.js")}
        >
          <div>
            <DiNodejs />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "React")}
        >
          <div>
            <DiReact />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Solidity")}
        >
          <div>
            <SiSolidity />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "MongoDB")}
        >
          <div>
            <DiMongodb />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Selenium")}
        >
          <div>
          <SiSelenium />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "AWS")}
        >
          <div>
            <FaAws />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Git")}
        >
          <div>
            <DiGit />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Firebase")}
        >
          <div>
            <SiFirebase />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Python")}
        >
          <div>
            <DiPython />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Java")}
        >
          <div>
            <DiJava />
          </div>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}

export default Techstack;
