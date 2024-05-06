import { Button, Checkbox, Flex, Form, Input, Select, TimePicker } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCamera } from "../../../../store/faceDetection/thunkAction";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { createNotification, updateNotification } from "../../../../store/notification/thunkAction";
import { modalActions } from "../../../../store/modals/slice";
import dayjs from "dayjs";
import { notificationAction } from "../../../../store/notification/slice";

const CreateNotification = () => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const { notificationDetail } = useSelector(
    (state) => state.NotificationService
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // get camera data
  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);
  //display first time row of form
  useEffect(() => {
    if (!notificationDetail) {
      form.setFieldsValue({
        time: [{ start_time: "", end_time: "", schedule: [] }],
      });
    }
  }, [form, notificationDetail]);
  // schedule option
  const schedulesOption = [
    {
      value: 0,
      label: "Sunday",
      disabled: false,
    },
    {
      value: 1,
      label: "Monsday",
      disabled: false,
    },
    {
      value: 2,
      label: "Tuesday",
      disabled: false,
    },
    {
      value: 3,
      label: "Wedsnday",
      disabled: false,
    },
    {
      value: 4,
      label: "Thursday",
      disabled: false,
    },
    {
      value: 5,
      label: "Friday",
      disabled: false,
    },
    {
      value: 6,
      label: "Saturday",
      disabled: false,
    },
  ];
  //Submit form//
  //********** */
  const onSubmit = (value) => {
    let detail
    if (notificationDetail) {
      detail = notificationDetail[0]
    }
    const data = {
      id: detail?.id,
      name: value.name,
      cameras: value.camera,
      status: value.status,
      time: value.time,
      gender: value.gender?.toString(),
      mask: value.mask?.toString(),
      stranger: value.stranger?.toString(),
      age: value.age,
      type: value.alertType,
      smsNumber: value.smsNumber,
      zaloNumber: value.zaloNumber,
      telegramNumber: value.telegramNumber,
    };
    //create new notification
    if(!notificationDetail) {
      dispatch(createNotification(data));
    }
    //update notification
    else if(notificationDetail) {
      dispatch(updateNotification(data))
      dispatch(notificationAction.clearNotifiDetail())
    }
    //close and reset form 
    dispatch(modalActions.closeForm());
    form.resetFields();
  };
  //Get value from notificationDetail
  useEffect(() => {
    if (notificationDetail) {
      const details = notificationDetail[0];
      form.setFieldsValue({
        name: details.name,
        camera: details.camera,
        status: details.status.data[0],
        time: details.time?.map((item) => {
          return {
            start_time: dayjs(item.start_time, "HH:mm"),
            end_time: dayjs(item.end_time, "HH:mm"),
            schedule: item.day_of_week.split(",").map((x) => +x),
          };
        }),
        gender: details.gender,
        mask: details.mask,
        stranger: details.stranger,
        age: details.age,
        type: details.alertType,
        smsNumber: details.smsNumber,
        zaloNumber: details.zaloNumber,
        telegramNumber: details.telegramNumber,
      });
    }
    return () => {
      form.resetFields();
    };
  }, [notificationDetail, form]);
  //render UI
  return (
    <div>
      <h1 className="text-xl font-semibold">
        {notificationDetail ? "Update notification" : "Add new notification"}
      </h1>
      <hr />
      <div className="form mt-4">
        <Form
          layout="vertical"
          form={form}
          onFinish={(value) => {
            onSubmit(value);
          }}
        > 
          {/* Name, camera, status */}
          <Flex className="justify-between setting" wrap="wrap">
            {/* name */}
            <Form.Item
              name="name"
              label="Trigger name"
              rules={[
                {
                  required: true,
                  message: "Please input trigger name",
                },
              ]}
              className="w-1/4"
            >
              <Input />
            </Form.Item>
            {/* camera */}
            <Form.Item
              name="camera"
              label="Cameras/Position"
              className="w-1/4"
              rules={[{ required: true, message: "Please choose cameras" }]}
            >
              <Select
                showSearch
                placeholder="Search camera"
                optionFilterProp="children"
                mode="multiple"
                maxTagCount='responsive'
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={cameraList?.map((item) => {
                  return { value: item.id, label: item.name };
                })}
              />
            </Form.Item>
            {/* status */}
            <Form.Item name="status" label="Status" className="w-1/4">
              <Select
                options={[
                  {
                    value: 0,
                    label: "Off",
                  },
                  {
                    value: 1,
                    label: "On",
                  },
                ]}
              />
            </Form.Item>
          </Flex>
          {/* Time (startTime, endTime, date) */}
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
                      className="justify-start gap-10 w-full items-end"
                    >
                      {/* start time */}
                      <Form.Item
                        {...restField}
                        name={[name, "start_time"]}
                        label={index === 0 ? "Start time" : null}
                        rules={[
                          {
                            required: true,
                            message: "Please choose time",
                          },
                        ]}
                      >
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                      {/* end time */}
                      <Form.Item
                        {...restField}
                        name={[name, "end_time"]}
                        label={index === 0 ? "End time" : null}
                        rules={[
                          {
                            required: true,
                            message: "Please choose time",
                          },
                        ]}
                      >
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                      {/* schedule */}
                      <Form.Item
                        {...restField}
                        name={[name, "schedule"]}
                        label={index === 0 ? "Schedule" : null}
                        rules={[
                          {
                            required: true,
                            message: "Please choose day",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          style={{ minWidth: "300px" }}
                          showSearch
                          placeholder="Search camera"
                          optionFilterProp="children"
                          maxTagCount='responsive'
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={schedulesOption}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => remove(name)}
                            block
                          >
                            <MinusOutlined />
                          </Button>
                        </Form.Item>
                      ) : null}
                    </Flex>
                  ))}
                </div>

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined />
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {/* Gender, mask, age, inside or outside */}
          <Flex className="object justify-between">
            <Form.Item name="gender" label="Gender:">
              <Checkbox.Group className="gap-5">
                <Checkbox
                  value={0}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Female
                </Checkbox>
                <Checkbox
                  value={1}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Male
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="mask" label="Mask:">
              <Checkbox.Group className="gap-5">
                <Checkbox
                  value={1}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Mask
                </Checkbox>
                <Checkbox
                  value={0}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  No mask
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="stranger" label="Stranger:">
              <Checkbox.Group className="gap-5">
                <Checkbox
                  value={1}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Acquaintance
                </Checkbox>
                <Checkbox
                  value={0}
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Stranger
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="age" label="Age">
              <Input placeholder="please input age" type="text" />
            </Form.Item>
          </Flex>
          {/* Alert type */}
          <Flex className="justify-start gap-4">
            <Form.Item
              initialValue={[]}
              name="alertType"
              label="Alert type:"
              className="w-1/3"
            >
              <Select
                showSearch
                placeholder="Choose alert type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                mode="multiple"
                options={[
                  {
                    value: "SMS",
                    label: "SMS",
                  },
                  {
                    value: "zalo",
                    label: "Zalo",
                  },
                  {
                    value: "telegram",
                    label: "Telegram",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.alertType !== currentValues.alertType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("alertType")?.indexOf("SMS") !== -1 ? (
                  <Form.Item
                    name="smsNumber"
                    label="SMS Number"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.alertType !== currentValues.alertType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("alertType")?.indexOf("zalo") !== -1 ? (
                  <Form.Item
                    name="zaloNumber"
                    label="Zalo Number"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.alertType !== currentValues.alertType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("alertType")?.indexOf("telegram") !== -1 ? (
                  <Form.Item
                    name="telegramNumber"
                    label="Telegram Number"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Flex>
          {/* Button confirm */}
          <Flex className="w-full justify-end gap-2">
            <Button
              type="default"
              onClick={() => {
                dispatch(modalActions.closeForm());
                dispatch(notificationAction.clearNotifiDetail());
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" className="bg-[#1677ff]" htmlType="submit">
              {notificationDetail
                ? "Update notification"
                : "Add new notification"}
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default CreateNotification;
