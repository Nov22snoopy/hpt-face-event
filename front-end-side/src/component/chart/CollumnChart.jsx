import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);


const CollumnChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        color:'rgb(157 33 59)',
        display: true,
        text: `${props?.tilte}`,
      },
      
    },
    
  
  };
  console.log(props.label);
  //data
  const data = {
    labels: props.data?.map((item,i)=>{return item.age}),
    datasets: [
      {
        label: "Quantity",
        data: props.data?.map((item)=>{return item.quantity}), 
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="md:w-[80%] h-screen  mx-auto w-[50%]">
      <Bar height={"auto%"} options={options} data={data} />
    </div>
  );
};

export default CollumnChart;
