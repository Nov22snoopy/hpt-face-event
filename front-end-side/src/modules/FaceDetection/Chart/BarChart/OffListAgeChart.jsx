import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getOffListAge } from "../../../../store/faceDetection/thunkAction";
import "./ageChart.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);
const OffListAgeChart = (props) => {
  const { offListAge } = useSelector((state) => state.FaceDetectionService);
  const dispacth = useDispatch();
  useEffect(() => {
    if (props.data?.date !== undefined) {
      dispacth(getOffListAge(props.data));
    }
  }, [props.data, dispacth]);
  ChartJS.defaults.font.size = 16;
  ChartJS.defaults.font.family = '"Roboto", sans-serif';
  ChartJS.defaults.color ='rgb(108 114 147)';
  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: "64px",
        },
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        font: { size: "14" },
      },
      title: {
        display: false,
        text: "Statistic Age Chart",
        font: {
          size: "24px",
        },
        padding: 30,
        color: "rgb(157 33 59)",
      },
      test: {
        color: "white",
      },
    },
  };

  const data = {
    labels: offListAge?.map((item, i) => (item = item.age)),

    datasets: [
      {
        label: "Quantity ",
        data: offListAge?.map((item, i) => (item = item.quantity)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="age-chart w-full mx-auto mt-2">
      <div>
        <h2 className="age-chart-title">Statistic Age Chart</h2>
      </div>
      <Bar height={500} width={700} options={options} data={data} />
    </div>
  );
};

export default OffListAgeChart;
