import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SiVisualstudiocode, SiSlack, SiVercel, SiMacos,SiArduino, } from "react-icons/si";
import { FaWindows, FaLinux } from "react-icons/fa";
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

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Windows")}
        >
          <div>
            <FaWindows />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Linux")}
        >
          <div>
            <FaLinux />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Visual Studio Code")}
        >
          <div>
            <SiVisualstudiocode />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Arduino IDE")}
        >
          <div>
          <SiArduino />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, "Vercel")}
        >
          <div>
            <SiVercel />
          </div>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}

export default Toolstack;


