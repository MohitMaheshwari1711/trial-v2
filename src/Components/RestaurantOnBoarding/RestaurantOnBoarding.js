import { Button, Form, Input, Col, Row, Divider, Upload, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { restaurantOnboarding } from "../../api";

const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  listType: "picture",
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = "red";
          ctx.textBaseline = "middle";
          ctx.font = "33px Arial";
          ctx.fillText("Ant Design", 20, 20);
          canvas.toBlob((result) => resolve(result));
        };
      };
    });
  },
};

const RestaurantOnBoarding = () => {
  const onFinish = (values) => {
    restaurantOnboarding(values).then((val) => {
      notify(val.data.restaurantId);
    });
  };
  const notify = (restaurantId) =>
    toast.success(`Your restaurant ID is - ${restaurantId}`);
  return (
    <div
      style={{
        paddingTop: 24,
        marginLeft: 48,
        marginRight: 48,
      }}
    >
      <Form name="onboarding" onFinish={onFinish} layout={"vertical"}>
        <Row>
          <Col span={6}></Col>
          <Col
            span={12}
            style={{ fontWeight: 500, fontSize: 30, marginBottom: 40 }}
          >
            Add your details
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Form.Item
              name="restaurantName"
              label="Restaurant Name"
              rules={[
                {
                  required: true,
                  message: "Please enter restaurant name",
                },
              ]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
            >
              <Input.TextArea
                style={{ height: 40 }}
                maxLength={480}
                showCount
              />
            </Form.Item>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Divider />
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please enter city",
                },
              ]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Form.Item
              name="locationAddress"
              label="Location address"
              rules={[
                {
                  required: true,
                  message: "Please enter detailed location address",
                },
              ]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Form.Item
              name="defaultDiscount"
              label="Default Discount"
              rules={[
                {
                  required: true,
                  message: "Please enter default discount",
                },
              ]}
              initialValue={10}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Button type="primary" ghost icon={<SearchOutlined />}>
              Search and use you current location
            </Button>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Divider />
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Brand Logo</span>
              <Upload {...props}>
                <Button icon={<PlusOutlined />} type="primary" ghost>
                  Upload PNG
                </Button>
              </Upload>
            </div>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Divider />
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Main Image</span>
              <Upload {...props}>
                <Button icon={<PlusOutlined />} type="primary" ghost>
                  Upload PNG
                </Button>
              </Upload>
            </div>
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Divider />
          </Col>
          <Col span={6}></Col>

          <Col span={6}></Col>
          <Col span={12}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: 40 }}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col span={6}></Col>

          {/* <Form.Item
            name="city"
            label="City"
            labelCol={{
              span: 3,
            }}
            rules={[
              {
                required: true,
                message: "Please enter city",
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="defaultDiscount"
            label="Default Discount"
            labelCol={{
              span: 3,
            }}
            initialValue={10}
            rules={[
              {
                required: true,
                message: "Please enter default discount",
              },
            ]}
          >
            <Input placeholder="Default Discount" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            labelCol={{
              span: 3,
            }}
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
          */}
        </Row>
      </Form>
      <ToastContainer />
    </div>
  );
};
export default RestaurantOnBoarding;
