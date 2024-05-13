import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getCameraFaceEvent } from "../../../store/notification/thunkAction";
const CameraFaceEvent = (props) => {
  const {cameraFaceWarning} = useSelector((state)=>state.NotificationService)
  const dispatch = useDispatch()
  const {date} = props;
  useEffect(()=>{
    dispatch(getCameraFaceEvent(date))
  },[dispatch,date])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        font: { size: "14" },
      },
      title: {
        display: true,
        text: "Face warning",
        font: {
          size: "18px",
        },
      },
    },
  };
  const data = {
    labels: cameraFaceWarning?.map((item)=>item.camera),
    datasets: [
      {
        label: 'Quantity',
        data: cameraFaceWarning?.map((item)=>item.quantity),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data}/>
    </div>
  )
}

export default CameraFaceEvent