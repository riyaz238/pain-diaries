import React from "react";
import styled from "@emotion/styled";
import imagebg from "../assets/pain-diary3.png";
import PainChartComponent from "../components/painCharts";

const PageContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.1;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Puts the image behind other content */
`;

const HistoryPage: React.FC = () => (
  <PageContainer>
    <BackgroundImage src={imagebg} alt="Large Background" />
    <PainChartComponent />
  </PageContainer>
);

export default HistoryPage;
