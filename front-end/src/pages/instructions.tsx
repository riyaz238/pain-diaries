import React from "react";
import styled from "@emotion/styled";
import imagebg from "../assets/pain-diary3.png";

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

const InstructionSection = styled.div`
  position: realtive;
  right: 50%;
  top: 50%;
  // transform: translateY(-50%) translateX(-50%);
  width: 90%;
  height: 90%;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.1); /* Semi-transparent dark background */
  border-radius: 10px;
  color: black;
  backdrop-filter: blur(7px); /* Optional: Adds a blur effect */
`;

const Para = styled.p`
  width: 100%;
  margin: 10px 20px;
  text-align: justify;
  word-spacing: -0.1em;
`;

const Heading = styled.h2`
  font-size: 24px;
  width: 90%;
  text-align: center;
  word-spacing: -0.1em;
`;

const JustifiedList = styled.ul`
  width: 95%;
  padding-left: 1rem;
  list-style-type: decimal; /* Bullet points */

  li {
    text-align: justify;
    text-align-last: left;
    hyphens: auto;
    word-spacing: -0.1em;
  }
`;
const InstructionsPage: React.FC = () => (
  <PageContainer>
    <BackgroundImage src={imagebg} alt="Large Background" />
    <Heading>General instruction to help record your pain details</Heading>
    <InstructionSection>
      <Para>
        Completing a pain diary can be a very useful tool in helping you and the
        healthcare professionals supporting you understand how your pain levels
        are affected by your activities and medication.
      </Para>
      <Para>
        Sometimes the diary can help you identify the things that make your pain
        worse and the things that help.
      </Para>
      <Para>Instructions:- an example sheet has been included</Para>
      <JustifiedList>
        <li>
          At various times during the day, as often as possible, mark the line
          at the spot that reflects your pain levels at that time. The scale is
          from 0 to 10, with 0 representing “no pain” and 10 representing the
          “worst pain” possible.
        </li>
        <li>
          Record the activity that you were doing at the time (e.g. sitting,
          doing housework, sleeping, shopping, gardening etc).
        </li>
        <li>Record any pain medicine taken, at the time that you took it.</li>
        <li>
          At the bottom of the page record any general comments about your
          sleep/ feelings for the day
        </li>
        <li>
          Also don’t get up and record during the night- only do so if you are
          awake or complete retrospectively the next morning
        </li>
      </JustifiedList>
      <Para>
        Don’t worry about keeping a diary every day. It can be helpful in times
        when there are changes – perhaps you are have changed activity levels,
        or you have changed medication. Keeping a pain diary for a short period
        can help you assess whether the changes have been helpful or not
      </Para>
    </InstructionSection>
  </PageContainer>
);

export default InstructionsPage;
