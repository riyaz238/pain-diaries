import React, { useState } from "react";
import styled from "@emotion/styled";

interface PageContainerProps {
  isBackgroundActive: boolean;
}

const PageContainer = styled.div<PageContainerProps>`
  min-height: 100vh;
  transition: background 0.3s ease;
  background: ${({ isBackgroundActive }) =>
    isBackgroundActive
      ? `url('your-image-path.jpg') no-repeat center center fixed`
      : "#fff"};
  background-size: cover;
`;

const ToggleButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const App: React.FC = () => {
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);

  return (
    <PageContainer isBackgroundActive={isBackgroundActive}>
      <ToggleButton onClick={() => setIsBackgroundActive((prev) => !prev)}>
        {isBackgroundActive ? "Remove Background" : "Apply Background"}
      </ToggleButton>
      {/* Additional page content can go here */}
    </PageContainer>
  );
};

export default App;
