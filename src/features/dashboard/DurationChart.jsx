import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";
import { useDarkMode } from "../../context/darkModeContext";

const startDataLight = [
  { duration: "1 night", value: 0, color: "#fb923c" },
  { duration: "2 nights", value: 0, color: "#f43f5e" },
  { duration: "3 nights", value: 0, color: "#facc15" },
  { duration: "4-5 nights", value: 0, color: "#a3e635" },
  { duration: "6-7 nights", value: 0, color: "#34d399" },
  { duration: "8-14 nights", value: 0, color: "#22d3ee" },
  { duration: "15-21 nights", value: 0, color: "#818cf8" },
  { duration: "21+ nights", value: 0, color: "#e879f9" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#fdba74" },
  { duration: "2 nights", value: 0, color: "#fb7185" },
  { duration: "3 nights", value: 0, color: "#fde047" },
  { duration: "4-5 nights", value: 0, color: "#bef264" },
  { duration: "6-7 nights", value: 0, color: "#6ee7b7" },
  { duration: "8-14 nights", value: 0, color: "#67e8f9" },
  { duration: "15-21 nights", value: 0, color: "#a5b4fc" },
  { duration: "21+ nights", value: 0, color: "#f0abfc" },
];

function incArrayValue(arr, field) {
  return arr.map((obj) =>
    obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
  );
}

function prepareData(startData, stays) {
  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <DashboardBox className="col-[3/span_2]">
      <Heading as="h2">Stay duration summary</Heading>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              cx="40%"
              cy="50%"
              innerRadius={85}
              outerRadius={110}
              paddingAngle={3}
              startAngle={180}
              endAngle={-180}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.duration}
                  fill={entry.color}
                  stroke={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full justify-center items-center">
          <p className="text-center text-xxl text-gray-200">
            No confirmed stays in the last 7 days.
          </p>
        </div>
      )}
    </DashboardBox>
  );
}

export default DurationChart;
