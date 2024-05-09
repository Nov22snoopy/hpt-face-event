import React, { useEffect } from "react";
import { Button, Flex, Form, Select, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getAllCamera } from "../../../store/faceDetection/thunkAction";
import { modalActions } from "../../../store/modals/slice";
import { poseDetectionActions } from "../../../store/poseDetection/slice";
import { createPoseDetectionSetting, updatePoseDetectionSetting } from "../../../store/poseDetection/thunkAction";

const PoseAlertForm = () => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const { poseDetectionDetail } = useSelector(
    (state) => state.PoseDetectionService
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // get camera data
  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);
  //display first time row of form
  useEffect(() => {
    if (!poseDetectionDetail) {
      form.setFieldsValue({
        time: [{ start_time: "", end_time: "", schedule: [] }],
      });
    }
  }, [form, poseDetectionDetail]);
  //schedule option
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
  console.log(poseDetectionDetail);
  //set pose alert setting detail
  useEffect(() => {
    if (poseDetectionDetail) {
      const detail = poseDetectionDetail[0];
      form.setFieldsValue({
        poseType: detail.poseType,
        camera: detail.camera,
        status: Number(detail.status.data.toString("hex")),
        time: detail?.time.map((item) => {
          return {
            start_time: dayjs(item.start_time, "HH:mm"),
            end_time: dayjs(item.end_time, "HH:mm"),
            schedule: item.day_of_week.split(",").map((x)=>+x),
          };
        }),
      });
    }
    return () => {
      form.resetFields();
    };
  }, [form, poseDetectionDetail]);
  //submit form
  const onSubmit = (value) => {
    if(!poseDetectionDetail) {
      dispatch(createPoseDetectionSetting(value));
    }
    else if (poseDetectionDetail) {
      const detail = poseDetectionDetail[0]
      const data = {
        id: detail.id,
        poseType: value.poseType,
        camera: value.camera,
        time:value.time,
        status: value.status
      }
      dispatch(updatePoseDetectionSetting(data))
    }
    dispatch(modalActions.closePoseAlertModal())
    form.resetFields()
  };
  return (
    <div>
      <h1 className="text-xl font-semibold">
        {poseDetectionDetail ? "Update trigger" : "Add new trigger"}
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
              name="poseType"
              label="Pose Alert"
              rules={[
                {
                  required: true,
                  message: "Please select pose type alert",
                },
              ]}
              className="w-1/4"
            >
              <Select
                showSearch
                placeholder="Select pose alert type"
                optionFilterProp="children"
                maxTagCount="responsive"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  { label: "falling_down", value: "falling_down" },
                  { label: "sitting", value: "sitting" },
                ]}
              />
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
                maxTagCount="responsive"
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
            <Form.Item initialValue={0} name="status" label="Status" className="w-1/4">
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
                            message: "Please choose start time",
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
                            message: "Please choose end time",
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
                          placeholder="Select date"
                          optionFilterProp="children"
                          maxTagCount="responsive"
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
          {/* Button confirm */}
          <Flex className="w-full justify-end gap-2">
            <Button
              type="default"
              onClick={() => {
                dispatch(poseDetectionActions.clearPoseDetectionDetail());
                dispatch(modalActions.closePoseAlertModal());
              }}
            >
              Cancel
            </Button>
            <Button type="primary" className="bg-[#1677ff]" htmlType="submit">
              {poseDetectionDetail ? "Update trigger" : "Add new trigger"}
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default PoseAlertForm;
