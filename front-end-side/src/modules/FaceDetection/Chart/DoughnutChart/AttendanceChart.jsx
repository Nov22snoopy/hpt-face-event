import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";

import { Doughnut } from "react-chartjs-2";
import "./attendanceChart.css";
import { getAttendanceList } from "../../../../store/faceDetection/thunkAction";
ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = (props) => {
  const {attendance} = useSelector(state => state.FaceDetectionService)
  const dispatch = useDispatch();
  useEffect(()=> {
    if (props.data?.date !== undefined) {
      dispatch(getAttendanceList({date: props.data.date}))
    }
  },[dispatch, props.data])
  const data = {
    labels: attendance?.map(item => item.status),
    datasets: [
      {
        label: 'Quantity',
        data: attendance?.map(item => item.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      // 
    },
  };
  return (
    <div className="attendance-chart w-auto md:h-[500px] mx-auto">
      <div>
        <h2 className="attendance-chart-title md:pt-5 pt-4">
          Statistic Attendance Chart
        </h2>
      </div>
      <Doughnut
        data={data}
        height={"auto"}
        options={options}
      />
    </div>
  );
};

export default AttendanceChart;
