import React, { useState } from "react";
import OffListAgeChart from "./BarChart/OffListAgeChart";
import { ConfigProvider, DatePicker } from "antd";
import dayjs from "dayjs";
import OffListGenderChart from "./PipeChart/OffListGenderChart";
import DoughnutChart from "./DoughnutChart/AttendanceChart";
const Chart = () => {
  const [date, setDate] = useState("2024-03-18");
  // get age in off list
  // useEffect(() => {

  //   dispacth(getOffListAge());
  // }, [dispacth]);
  // datepicer onchange
  const onChange = (d, dateString) => {
    const datePick = {
      date: date,
    };
    if (dateString) {
      setDate(dateString);
    }
    return datePick;
  };
  return (
    <div className="chart container">
      <div className="data-picker w-fit ml-auto md:mr-20">
        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                /* here is your component tokens */
                cellHoverBg: "white",
              },
            },
            token: {
              colorBgElevated: "rgb(42 43 47)",
              colorIcon: "rgb(108 114 147)",
              colorText: "rgb(108 114 147)",
            },
          }}
        >
          <DatePicker
            style={{
              backgroundColor: "rgb(42 43 47)",
              color: "rgb(108 114 147)",
            }}
            defaultValue={dayjs("2024-03-18")}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
      {/*Render Chart  */}
      {/* ************ */}
      <div className="row mt-3">
        <div className="chart-item col-lg-6 col-12 ">
          <OffListAgeChart data={onChange()} />
        </div>

        <div className="chart-item col-lg-6 col-12 ">
          <OffListGenderChart data={onChange()} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="chart-item col-lg-6 col-12 ">
          <DoughnutChart data={onChange()} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
