import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Navbar = styled.nav`
  margin-right: 20px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  padding: 10px 6%;
  background: rgba(0, 0, 0, 0.1); /* Semi-transparent dark background */
  border-radius: 5px;
  backdrop-filter: blur(2px); /* Optional: Adds a blur effect */
  color: black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
`;

const UserMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  right: 0px;
  background: rgba(0, 0, 0, 0.6);
  color: lightGray;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 120px;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  background: none;
  border: none;
  color: grey;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const NavbarComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        Pain Diary Home
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <UserMenu>
          <span
            onClick={() => setIsOpen(!isOpen)}
            style={{ cursor: "pointer" }}
          >
            Navigate to
          </span>
          <Dropdown isOpen={isOpen}>
            <DropdownItem
              onClick={() => {
                setIsOpen(false);
                navigate("/history");
              }}
            >
              History
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setIsOpen(false);
                navigate("/new-record");
              }}
            >
              Add New
            </DropdownItem>
          </Dropdown>
        </UserMenu>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
