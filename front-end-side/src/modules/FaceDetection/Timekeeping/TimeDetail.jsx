import { Button, Flex, Form, Input, TimePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeOut } from "../../../store/faceDetection/thunkAction";
import moment from "moment";
import dayjs from "dayjs";
import { faceDetectionActions } from "../../../store/faceDetection/slice";

const TimeDetail = (props) => {
  const [timeOut, setTimeOut] = useState();
  const { timeDetail, updating } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  console.log(timeDetail);
  //set check out time
  const checkTimeOut = () => {
    if (timeDetail) {
      const { time } = timeDetail;
    }
  };
  //set time check out for update
  const onChange = (time, timeString) => {
    setTimeOut(timeString);
  };
  //set defaul form value
  useEffect(() => {
    if (timeDetail) {
      form.setFieldsValue({
        name: timeDetail?.name,
        email: timeDetail?.comment,
        gender: timeDetail?.gender === 1 ? "Male" : "Female",
        time: timeDetail?.time.map((item) => {
          return {
            check_in: dayjs(item.check_in, "HH:mm"),
            check_out: dayjs(item.check_out, "HH:mm"),
          };
        }),
      });
    }
    return () => {
      form.resetFields();
    };
  }, [timeDetail, form]);
  const updateCheckOut = (value) => {
    //dispatch(updateTimeOut(data));
    console.log(value);
    dispatch(faceDetectionActions.clearTimeDetail())
    props.openModal(false);
    
  };
  
  //validate time
  const disableHours = (maxHour, minHour) => {
    if (timeDetail) {
      const max = maxHour.split(":");
      const min = minHour.split(":");
      const hours = [];
      for (let i = 0; i < Number(max[0]); i += 1) {
        hours.push(i);
      }
      for (let j = Number(min[0]) + 1; j < 24; j += 1) {
        hours.push(j);
      }
      return hours;
    }
  };
  const disabledMinutes = (selectedHour, maxHour, minHour) => {
    if (timeDetail) {
      const max = maxHour.split(":");
      const min = minHour.split(":");
      const minutes = [];
      if (selectedHour === Number(max[0])) {
        for (let i = 0; i <= Number(max[1]); i += 1) minutes.push(i);
      }
      if (selectedHour === Number(min[0])) {
        for (let i = Number(min[1]); i <= 59; i += 1) minutes.push(i);
      }
      return minutes;
    }
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={(value) => updateCheckOut(value)}
      >
        <Flex className="justify-between mail-detail gap-2">
          <Form.Item name="name" label="Name">
            <Input size="small" type="text" className="rounded-md" disabled />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input size="small" type="text" className="rounded-md" disabled />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input size="small" type="text" className=" rounded-md" disabled />
          </Form.Item>
        </Flex>
        <hr className="mb-4" />
        <Form.List name="time" initialValue={[]}>
          {(fields, { add, remove }) => (
            <>
              <div
                className="overflow-y-auto w-full"
                style={{ maxHeight: "200px" }}
              >
                {fields.map(({ key, name, ...restField }, index) => (
                  <Flex
                    key={key}
                    className="time-picker flex items-center justify-around"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "check_in"]}
                      label="Check In:"
                      rules={[{ required: true }]}
                    >
                      <TimePicker
                        format="HH:mm"
                        onChange={onChange}
                        disabled={
                          timeDetail?.time[index].check_in === "00:00"
                            ? false
                            : true
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "check_out"]}
                      label="Check Out:"
                      rules={[{ required: true }]}
                    >
                      <TimePicker
                        format="HH:mm"
                        onChange={onChange}
                        disabled={
                          timeDetail?.time[index].check_out === "00:00"
                            ? false
                            : true
                        }
                        disabledTime={() => {
                          if (timeDetail) {
                            const { time } = timeDetail;
                            if (time.length > 0 && index + 1 < time.length) {
                              if (time[index].check_out === "00:00") {
                                return {
                                  disabledHours: () =>
                                    disableHours(
                                      time[index].check_in,
                                      time[index + 1].check_in
                                    ),
                                  disabledMinutes: (validate) =>
                                    disabledMinutes(
                                      validate,
                                      time[index].check_in,
                                      time[index + 1].check_in
                                    ),
                                };
                              } else if (time[index]?.check_out !== "00:00") {
                                return;
                              }
                            }
                            if (time.length > 0 && index + 1 === time.length) {
                              if (time[index].check_out === "00:00") {
                                return {
                                  disabledHours: () =>
                                    disableHours(time[index].check_in, "24:00"),
                                  disabledMinutes: (validate) =>
                                    disabledMinutes(
                                      validate,
                                      time[index].check_in,
                                      "24:00"
                                    ),
                                };
                              } else if (time[index]?.check_out !== "00:00") {
                                return;
                              }
                            }
                          }
                        }}
                      />
                    </Form.Item>
                  </Flex>
                ))}
              </div>
            </>
          )}
        </Form.List>

        <div className=" w-fit ml-auto ">
            <Button
              htmlType="submit"
              type="primary"
              className="bg-[#1677ff]"
              loading={updating}
            >
              Update
            </Button>
        </div>
      </Form>
    </div>
  );
};

export default TimeDetail;
