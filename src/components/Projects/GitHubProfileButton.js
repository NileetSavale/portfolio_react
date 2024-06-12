import React from "react";
import Button from "react-bootstrap/Button";
import { BsGithub } from "react-icons/bs";
// import './GitHubProfileButton.css'; // Import the CSS file

function GitHubProfileButton() {
  return (
    <div className="github-profile-button">
      <Button
        variant="primary"
        href="https://github.com/NileetSavale" // Replace with your GitHub profile link
        target="_blank"
      >
        <BsGithub /> &nbsp;
        {"Check out my other projects"}
      </Button>
    </div>
  );
}

export default GitHubProfileButton;
