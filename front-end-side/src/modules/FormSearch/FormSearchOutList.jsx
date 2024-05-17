import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Select } from "antd";
import React, { useEffect } from "react";
import "./FormSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCamera } from "../../store/faceDetection/thunkAction";
const FormSearchOutList = (props) => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  const { setDate, setStreamId } = props;
  //change date data for searching by date
  const onChange = (d, dateString) => {
    setDate(dateString);
  };
  //get all camera
  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);
  //set form
  const [form] = Form.useForm();

  return (
    <>
      <div className="Container__Form">
        <h2 className="formSearch__title">Out List</h2>
        <div className="Content__Form">
          <Form
            form={form}
            layout="inline"
          >
            {/* Select date */}
            <Form.Item style={{ marginInlineEnd: "5px" }} name="date">
              <DatePicker allowClear={true} onChange={onChange} />
            </Form.Item>
            {/* Select camera */}
            <Form.Item style={{ marginInlineEnd: "5px" }} name="camera">
              <Select
                style={{ minWidth: "200px" }}
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
                onChange={(value) => {
                  setStreamId(value);
                }}
              />
            </Form.Item>
            <Button
              title="claer data"
              className="ButtonCustom DeleteBtn"
              icon={<CloseOutlined />}
              onClick={() => {
                form.resetFields();
                setDate("");
                setStreamId([]);
              }}
            ></Button>
          </Form>

          <Button
            title="Refresh data"
            className="ButtonCustom DetailBtn"
            icon={<ReloadOutlined />}
          ></Button>
        </div>
      </div>
      <hr className="my-3" />
    </>
  );
};

export default FormSearchOutList;
