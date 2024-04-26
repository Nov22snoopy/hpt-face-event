import { Button, Checkbox, Flex, Form, Input, Select, TimePicker } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewNotification,
  getAllCamera,
  updateNotification,
} from "../../../../store/faceDetection/thunkAction";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { createNotification } from "../../../../store/notification/thunkAction";
import { modalActions } from "../../../../store/modals/slice";


const CreateNotification = () => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const { notificationDetail } = useSelector(
    (state) => state.NotificationService
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);

  useEffect(()=>{
    form.setFieldsValue({
      time: [{start_time: '', end_time: '', schedule: []}]
    })
  },[])
  console.log(notificationDetail);
  const schedulesOption = [
    {
      value: 1,
      label: "Monsday",
    },
    {
      value: 2,
      label: "Tuesday",
    },
    {
      value: 3,
      label: "Wedsnday",
    },
    {
      value: 4,
      label: "Thursday",
    },
    {
      value: 5,
      label: "Friday",
    },
    {
      value: 6,
      label: "Saturday",
    },
    {
      value: 0,
      label: "Sunday",
    },
  ];

  //Submit form//
  //********** */
  const onSubmit = (value) => {

    const data = {
      name: value.name,
      cameras: value.camera,
      status: value.status,
      time: value.time,
      gender: value.gender?.toString(),
      mask: value.mask?.toString(),
      stranger: value.stranger?.toString(),
      type: value.alertType,
      smsNumber: value.smsNumber,
      zaloNumber: value.zaloNumber,
      telegramNumber: value.telegramNumber,
    };
    console.log(data.cameras);
    dispatch(createNotification(data))
    dispatch(modalActions.closeForm())
    form.resetFields()
  };
  //Get value from notificationDetail

  return (
    <div>
      <h1 className="text-xl font-semibold">Add new trigger</h1>
      <hr />
      <div className="form mt-4">
        <Form
          layout="vertical"
          form={form}
          onFinish={(value) => {
            onSubmit(value);
          }}
        >
          <Flex className="justify-between setting" wrap="wrap">
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
          <Form.List name="time" >
            {(fields, { add, remove }) => (
              <>
                <div
                  className="overflow-y-auto w-full"
                  style={{ maxHeight: "150px" }}
                >
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex
                      key={key}
                      className="justify-start gap-10 w-full items-end"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "start_time"]}
                        label= {key < 1 ? "Start time": null}
                        rules={[
                          {
                            required: true,
                            message: "Please choose start time",
                          },
                        ]}
                      >
                        <TimePicker format="HH:mm" needConfirm={false} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "end_time"]}
                        label= {key < 1 ? "End time": null}
                        rules={[
                          {
                            required: true,
                            message: "Please choose end time",
                          },
                        ]}
                      >
                        <TimePicker format="HH:mm" needConfirm={false} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "schedule"]}
                        label= {key < 1 ? "Schedule": null}
                        rules={[
                          {
                            required: true,
                            message: "Please choose day",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          style={{minWidth: '300px'}}
                          showSearch
                          placeholder="Search camera"
                          optionFilterProp="children"
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
                     {fields.length > 1? <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => remove(name)}
                          block
                        >
                          <MinusOutlined />
                        </Button>
                      </Form.Item>:null}
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
              <Input placeholder="please input age" />
            </Form.Item>
          </Flex>
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
          <Flex className="w-full justify-end gap-2">
            <Button type="default">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add new trigger
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default CreateNotification;
