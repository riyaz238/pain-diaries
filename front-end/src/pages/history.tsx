import React from "react";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  width: 90vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HistoryPage: React.FC = () => (
  <PageContainer>
    <p>History Page Content</p>
  </PageContainer>
);

export default HistoryPage;
