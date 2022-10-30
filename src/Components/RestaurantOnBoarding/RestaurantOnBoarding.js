import { Button, Form, Input } from "antd";
import React from "react";
import { restaurantOnboarding } from "../../api"


const RestaurantOnBoarding = () => {
    const onFinish = (values) => {
        restaurantOnboarding(values).then(
            (val) => console.log(val)
        )
      };
  return (
    <div
      style={{
        paddingTop: 24,
        marginLeft: 48,
        marginRight: 48,
      }}
    >
      <Form name="onboarding" onFinish={onFinish}>
        <Form.Item
          name="restaurantName"
          label="Restaurant Name"
          labelCol={{
            span: 3,
          }}
          rules={[
            {
              required: true,
              message: "Please enter restaurant name",
            },
          ]}
        >
          <Input placeholder="Restaurant Name" />
        </Form.Item>

        <Form.Item
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
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RestaurantOnBoarding;
