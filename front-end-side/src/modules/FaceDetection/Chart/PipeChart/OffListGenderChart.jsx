import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getOffListGender } from "../../../../store/faceDetection/thunkAction";
import "./genderChart.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const OffListGenderChart = (props) => {
  const { offListGender } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.data?.date !== undefined) {
      dispatch(getOffListGender(props.data));
    }
  }, [dispatch, props.data]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      // 
    },
  };
  const data = {
    labels: offListGender?.map((item) => {
      return item.gender === 1? 'Male' :"Female"
    }),
    datasets: [
      {
        label: "Quantity",
        data: offListGender?.map((item) => (item = item.quantity)),
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="gender-chart w-full mx-auto md:h-[500px]">
      <div>
        <h2 className="gender-chart-title md:pt-5 pt-4">Statistic Age Chart</h2>
      </div>
      <Pie  data={data} options={options} />
    </div>
  );
};

export default OffListGenderChart;
