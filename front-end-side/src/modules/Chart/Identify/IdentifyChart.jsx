import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getIdentifyStats } from "../../../store/faceDetection/thunkAction";
ChartJS.register(ArcElement, Tooltip, Legend);

const IdentifyChart = (props) => {
  const {identifyStats} = useSelector((state)=>state.FaceDetectionService)
  const dispatch = useDispatch()
  const {date} = props
  useEffect(()=>{
    dispatch(getIdentifyStats(date))
  },[dispatch,date])
  const options = {
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
        font: { size: "14" },
      },
      title: {
        display: true,
        text: "Statistic Identify",
        font: {
          size: "18px",
        },
      },
    },
  };
  const data = {
    labels: identifyStats?.map((item)=>item.name),
    datasets: [
      {
        label: "Quantity",
        data: identifyStats?.map((item)=>item.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie options={options} data={data} />;
    </div>
  );
};

export default IdentifyChart;
