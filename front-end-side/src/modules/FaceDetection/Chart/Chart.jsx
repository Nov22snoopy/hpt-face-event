import React, { useState } from "react";
import OffListAgeChart from "./BarChart/OffListAgeChart";
import { ConfigProvider, DatePicker } from "antd";
import dayjs from "dayjs";
import OffListGenderChart from "./PipeChart/OffListGenderChart";
import DoughnutChart from "./DoughnutChart/AttendanceChart";
import moment from "moment";
const Chart = () => {
  const currentDate = new Date().toDateString();
  const today = moment(dayjs(currentDate)).format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
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
              },
            },
            token: {
              colorIcon: "rgb(108 114 147)",
              colorText: "rgb(108 114 147)",
            },
          }}
        >
          <DatePicker
            style={{
              color: "rgb(108 114 147)",
            }}
            defaultValue={dayjs(currentDate)}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
      {/*Render Chart  */}
      {/* ************ */}
      <div className="row mt-3" >
        <div className="chart-item col-12 " >
          <OffListAgeChart data={onChange()} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="chart-item col-lg-6 col-12 ">
          <DoughnutChart data={onChange()} />
        </div>
        <div className="chart-item col-lg-6 col-12 ">
          <OffListGenderChart data={onChange()} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
