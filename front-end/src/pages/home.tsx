import React from "react";
import styled from "@emotion/styled";
import imagebg from "../assets/pain-diary3.png";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Puts the image behind other content */
`;

const LoginSection = styled.div`
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 170px;
  height: 230px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(256, 256, 256, 0.8); /* Semi-transparent dark background */
  border-radius: 10px;
  color: black;
  backdrop-filter: blur(5px); /* Optional: Adds a blur effect */
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  color: black;
  font-size: 16px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <BackgroundImage src={imagebg} alt="Large Background" />
      <LoginSection>
        <h3>Quick Links</h3>
        <Button onClick={() => navigate("/instructions")}>Instructions</Button>
        <Button onClick={() => navigate("/new-record")}>New Record</Button>
        <Button onClick={() => navigate("/history")}>History</Button>
      </LoginSection>
    </HomeContainer>
  );
};

export default HomePage;
