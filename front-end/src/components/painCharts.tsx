import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Styled container and toggle button using Emotion
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

interface ToggleButtonProps {
  active: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  padding: 10px 20px;
  margin: 0 5px;
  background: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.active ? "#fff" : "#2c3e50")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${(props) => (props.active ? "#2980b9" : "#bdc3c7")};
  }
`;

// Define the shape of our chart data
interface DataPoint {
  time: string;
  pain: number;
  paracetamol: number;
  ibuprofen: number;
}

/**
 * Color Code:
 *  - Pain Level:    #8884d8
 *  - Paracetamol:   #82ca9d
 *  - Ibuprofen:     #ffc658
 */
const COLORS = {
  pain: "#8884d8",
  paracetamol: "#82ca9d",
  ibuprofen: "#ffc658",
};

// Utility: generate a random pain level between 0 and 10
const generateRandomPainLevel = (): number => {
  return Math.round(Math.random() * 10);
};

// Generate data for the current day (12 points: every 2 hours)
const generateDayData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let hour = 0; hour < 24; hour += 2) {
    const pain = generateRandomPainLevel();
    const timeLabel = `${hour.toString().padStart(2, "0")}:00`;
    data.push({
      time: timeLabel,
      pain,
      paracetamol: parseFloat((pain * 0.2).toFixed(2)),
      ibuprofen: parseFloat((pain * 0.1).toFixed(2)),
    });
  }
  return data;
};

// Generate average pain level data for the past N days
const generateAverageData = (days: number): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const pain = generateRandomPainLevel();
    // Format as "M/D"
    const dateLabel = `${date.getMonth() + 1}/${date.getDate()}`;
    data.push({
      time: dateLabel,
      pain,
      paracetamol: parseFloat((pain * 0.2).toFixed(2)),
      ibuprofen: parseFloat((pain * 0.1).toFixed(2)),
    });
  }
  return data;
};

const PainChartComponent: React.FC = () => {
  // The range can be 'day', '7days', or '30days'
  const [selectedRange, setSelectedRange] = useState<
    "day" | "7days" | "30days"
  >("day");
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  // Update the chart data whenever the selected range changes
  useEffect(() => {
    if (selectedRange === "day") {
      setChartData(generateDayData());
    } else if (selectedRange === "7days") {
      setChartData(generateAverageData(7));
    } else if (selectedRange === "30days") {
      setChartData(generateAverageData(30));
    }
  }, [selectedRange]);

  return (
    <Container>
      <ToggleContainer>
        <ToggleButton
          active={selectedRange === "day"}
          onClick={() => setSelectedRange("day")}
        >
          Today
        </ToggleButton>
        <ToggleButton
          active={selectedRange === "7days"}
          onClick={() => setSelectedRange("7days")}
        >
          Last 7 Days
        </ToggleButton>
        <ToggleButton
          active={selectedRange === "30days"}
          onClick={() => setSelectedRange("30days")}
        >
          Last 30 Days
        </ToggleButton>
      </ToggleContainer>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pain"
            stroke={COLORS.pain}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="paracetamol"
            stroke={COLORS.paracetamol}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="ibuprofen"
            stroke={COLORS.ibuprofen}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default PainChartComponent;
