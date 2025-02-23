import { useState } from "react";
import styled from "@emotion/styled";
import imagebg from "../assets/pain-diary.png";
import {
  BsEmojiSmile,
  BsEmojiWink,
  BsEmojiNeutral,
  BsEmojiExpressionless,
  BsEmojiAstonished,
  BsEmojiTear,
} from "react-icons/bs";
import { PainDiaryEntry } from "../api";
import { useAddPainDiary } from "../hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  opacity: 0.7;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Puts the image behind other content */
`;

const QuestionSection = styled.div`
  position: realtive;
  width: 100%;
  height: 85%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(256, 256, 256, 0.8); /* Semi-transparent dark background */
  border-radius: 10px;
  color: black;
  backdrop-filter: blur(8px); /* Optional: Adds a blur effect */
`;

const QuestionContainer = styled.div`
  margin-top: 10px;
  width:90%
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

const time = [
  "08 AM",
  "10 AM",
  "12 PM",
  "02 PM",
  "04 PM",
  "06 PM",
  "08 PM",
  "10 PM",
  "00 AM",
  "02 AM",
  "04 AM",
  "06 AM",
];

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  gap: 5px;
`;

const QuestionButton = styled.button<{
  isAnswered: boolean;
  isNext: boolean;
}>`
  background-color: ${({ isAnswered, isNext }) =>
    isAnswered
      ? "darkGreen"
      : isNext
      ? "lightBlue"
      : "rgba(256, 256, 256, 0.8)"};
  color: black;
  width: 60px; /* Increased width to fit text */
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  disabled: {isAnswered};
`;

const Heading = styled.h2`
  font-size: 24px;
  width: 90%;
  text-align: center;
  word-spacing: -0.1em;
`;

const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 0px;
  flex-direction: row;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
  width: 80%;
`;

const EmojiWrapper = styled.div<{ isSelected: boolean }>`
  position: relative;
  font-size: 30px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: "${({ isSelected }) => (isSelected ? "✔️" : "")}";
    position: absolute;
    top: -10px;
    left: -10px;
    font-size: 20px;
    color: green;
  }
`;

const Emojis = [
  <BsEmojiSmile color="darkGreen" />,
  <BsEmojiWink color="darkGreen" />,
  <BsEmojiNeutral color="green" />,
  <BsEmojiNeutral color="green" />,
  <BsEmojiExpressionless color="orange" />,
  <BsEmojiExpressionless color="orange" />,
  <BsEmojiAstonished color="red" />,
  <BsEmojiAstonished color="red" />,
  <BsEmojiTear color="darkRed" />,
  <BsEmojiTear color="darkRed" />,
];

const FormContainer = styled.div`
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 90%;
  height: 100%;
`;

const FormWrapper = styled.form`
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 95%;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;

  td {
    padding: 10px;
    text-align: left;
  }
  label {
    font-weight: bold;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: vertical;
  padding: 8px;
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

// Styled select dropdown
const StyledSelect = styled.select`
  width: 80px;
  padding: 5px;
  font-size: 16px;
  border: 0px;
  border-radius: 8px;
  background-color: white;
  color: #333;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 91, 187, 0.5);
  }
`;

// Styled option (optional, mostly controlled by the browser)
const StyledOption = styled.option`
  background-color: white;
  color: black;
`;

const SubmitButton = styled.button`
  background: rgba(20, 20, 20, 0.5);
  color: white;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: green;
  }
  margin-left: 10px;
`;

const AddNewPage = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(time.length).fill(false)
  );
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<number>(1);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number>(0);
  const [formData, setFormData] = useState<PainDiaryEntry>({
    patientId: "123456",
    date: "23-02-2025",
    activity: "",
    painlevel: "",
    medication: "",
    timePeriod: "08 AM",
  });

  const { mutate } = useAddPainDiary();

  const today = new Date().toDateString();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[isNext - 1] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    for (let i = isNext + 1; i <= time.length + 1; i++) {
      if (i == time.length + 1) {
        setIsNext(0);
        setSubmitDisabled(true);
      } else if (answeredQuestions[i - 1]) {
        continue;
      } else {
        setIsNext(i);
        break;
      }
    }

    mutate(formData);

    /* setFormData({
      patientId: "",
      date: "",
      activity: "",
      painlevel: "",
      medication: "",
      timePeriod: "",
    }); */
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const painLevel = e.target.value;
    setFormData({ ...formData, painlevel: painLevel });
    setSelectedEmojiIndex(parseInt(painLevel) - 1);
  };

  const handleEmojiClick = (index: number) => {
    setSelectedEmojiIndex(index);
    setFormData({ ...formData, painlevel: "" + (index + 1) });
    formData.painlevel = `index`;
  };

  return (
    <PageContainer>
      <BackgroundImage src={imagebg} alt="Large Background" />
      <Heading>Start recording your details for today</Heading>
      <FormContainer>
        <FormWrapper onSubmit={handleSubmit}>
          <QuestionSection>
            <QuestionContainer>
              <p>
                Date: {today} / Time:{" "}
                {isNext === 1 ? time[time.length - 1] : time[isNext - 2]} AM
                till {time[isNext - 1]}
              </p>
            </QuestionContainer>
            <EmojiContainer>
              {Emojis.map((emoji, index) => (
                <EmojiWrapper
                  key={index}
                  isSelected={selectedEmojiIndex === index}
                  onClick={() => handleEmojiClick(index)}
                >
                  {emoji}
                </EmojiWrapper>
              ))}
            </EmojiContainer>
            <Table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">Activity:</label>
                  </td>
                  <td>
                    <StyledTextArea
                      id="activity"
                      name="activity"
                      value={formData.activity}
                      onChange={handleChange}
                      required
                      rows={6}
                      cols={60}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="painLevel">Pain Level Felt:</label>
                  </td>
                  <td>
                    <SelectWrapper>
                      <StyledSelect
                        id="painLevel"
                        name="painLevel"
                        value={formData.painlevel}
                        onChange={handleSelectChange}
                        required
                      >
                        <StyledOption value="0">Select</StyledOption>
                        <StyledOption value="1">1</StyledOption>
                        <StyledOption value="2">2</StyledOption>
                        <StyledOption value="3">3</StyledOption>
                        <StyledOption value="4">4</StyledOption>
                        <StyledOption value="5">5</StyledOption>
                        <StyledOption value="6">6</StyledOption>
                        <StyledOption value="7">7</StyledOption>
                        <StyledOption value="8">8</StyledOption>
                        <StyledOption value="9">9</StyledOption>
                        <StyledOption value="10">10</StyledOption>
                      </StyledSelect>
                    </SelectWrapper>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="email">Medication if any:</label>
                  </td>
                  <td>
                    <StyledTextArea
                      id="medication"
                      name="medication"
                      value={formData.medication}
                      onChange={handleChange}
                      required
                      rows={3}
                      cols={60}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </QuestionSection>
          <ButtonContainer>
            {time.map((label, index) => (
              <QuestionButton
                key={index}
                isAnswered={answeredQuestions[index]}
                isNext={index === isNext - 1}
                onClick={(e) => {
                  e.preventDefault();
                  setIsNext(index + 1);
                }}
              >
                {label}
              </QuestionButton>
            ))}
            <SubmitButton disabled={submitDisabled} type="submit">
              Submit
            </SubmitButton>
          </ButtonContainer>
        </FormWrapper>
      </FormContainer>
    </PageContainer>
  );
};

export default AddNewPage;
