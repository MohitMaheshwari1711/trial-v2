import React, { useState, useEffect } from "react";
import logo from "../../logo.svg";
import { useHistory } from "react-router-dom";
import {
  CloseCircleTwoTone,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Divider,
  Table,
  Button,
  Space,
  Dropdown,
  Menu,
  Modal,
  Input,
} from "antd";
import Column from "antd/lib/table/Column";

import {
  fetchAllPendingPosts,
  fetchAllPendingPostsByCity,
  fetchAllPendingPostsByRestaurant,
  updateContentSatusById,
} from "../../api";

const { Header, Content } = Layout;
const { TextArea } = Input;
const columns = [
  {
    title: "#",
    dataIndex: "id",
  },
  {
    title: "Influencer",
    dataIndex: "influencer",
  },
  {
    title: "Post's link",
    dataIndex: "post_link",
    render: (text) => <u>{text}</u>,
  },
];
const data = [
  {
    restaurantId: 1,
    restaurantName: "Bikanerwala",
    defaultDiscount: 10,
    createdDate: "2022-10-29T16:09:03",
    description: "this restaurant is self service restaurant",
    city: "gurgaon",
    contentList: [],
  },
  {
    restaurantId: 2,
    restaurantName: "Om sweets",
    defaultDiscount: 10,
    createdDate: "2022-10-29T16:12:40",
    description: "this restaurant is fine dine restaurant",
    city: "gurgaon",
    contentList: [
      {
        contentId: 1,
        platform: "instagram",
        type: "post",
        url: "abcd.com",
        status: "Processing",
        userId: "anujk",
        createdDate: "2022-10-29T22:30:22",
        restaurantId: 2,
        comment: "this is not valid.",
        couponId: 2,
      },
      {
        contentId: 2,
        platform: "instagram",
        type: "post",
        url: "abcddwdwd.com",
        status: "Processing",
        userId: "anujkkk",
        createdDate: "2022-10-29T22:30:22",
        restaurantId: 2,
        comment: "this is not valid.",
        couponId: 22,
      },
    ],
  },
  {
    restaurantId: 3,
    restaurantName: "Idli wala",
    defaultDiscount: 10,
    createdDate: "2022-10-29T16:21:03",
    description: "this restaurant is fine dine restaurant",
    city: "bangalore",
    contentList: [],
  },
  {
    restaurantId: 4,
    restaurantName: "Dosa wala",
    defaultDiscount: 10,
    createdDate: "2022-10-29T22:36:14",
    description: "this restaurant is fine dine restaurant",
    city: "bangalore",
    contentList: [],
  },
];

const ApprovalDashboard = () => {
  const history = useHistory();
  const [list, updateList] = useState([]);
  const [showCity, setCity] = useState("City/area");
  const [restaurantName, updateRestaurantName] = useState("Restaurant name");
  const [restaurantId, updateRestaurantId] = useState(null);
  const [comments, updateComments] = useState("");
  const [showModal, toggleShowModal] = useState({
    flag: false,
    contentId: "",
  });

  const cityList = (
    <Menu
      onClick={(e) => fetchContentByCity(e.key)}
      items={[
        {
          label: "Gurgaon",
          key: "gurgaon",
          onClick: () => setCity("Gurgaon"),
        },
        {
          label: "Hyderabad",
          key: "hyderabad",
          onClick: () => setCity("Hyderabad"),
        },
        {
          label: "Bangalore",
          key: "bangalore",
          onClick: () => setCity("Bangalore"),
        },
      ]}
    />
  );

  const restaurantOptions = (
    <Menu
      onClick={(e) => {
        updateRestaurantId(e.key);
        fetchContentByRestaurant(e.key);
      }}
      items={[
        {
          label: "Om Sweets",
          key: 2,
          onClick: () => updateRestaurantName("Om Sweets"),
        },
      ]}
    />
  );

  const filterContent = (data) => {
    const tableList = [];
    data.map((val) => {
      if (val.contentList.length > 0) {
        val.contentList.map((posts) => {
          if (posts.status === "Processing") {
            tableList.push({
              post_link: posts.url,
              influencer: posts.userId,
              id: posts.contentId,
              key: posts.contentId,
            });
          }
        });
      }
    });
    updateList(tableList);
  };

  const fetchContentByRestaurant = (id) => {
    fetchAllPendingPostsByRestaurant(id).then((response) => {
      const data = response.data;
      const tableList = [];
      data.map((val) => {
        if (val.contentList.length > 0) {
          val.contentList.map((posts) => {
            if (posts.status === "Processing") {
              tableList.push({
                post_link: posts.url,
                influencer: posts.userId,
                id: posts.contentId,
                key: posts.contentId,
              });
            }
          });
        }
      });
      updateList(tableList);
    });
  };

  const fetchContentByCity = (city) => {
    fetchAllPendingPostsByCity(city).then((response) => {
      const data = response.data;
      filterContent(data);
    });
  };

  const fetchAllPosts = () => {
    fetchAllPendingPosts().then((response) => {
      const data = response.data;
      const tableList = [];
      data.map((val) => {
        if (val.contentList.length > 0) {
          val.contentList.map((posts) => {
            if (posts.status === "Processing") {
              tableList.push({
                post_link: posts.url,
                influencer: posts.userId,
                id: posts.contentId,
                key: posts.contentId,
              });
            }
          });
        }
      });
      updateList(tableList);
    });
  };

  const approveModal = () => {
    Modal.success({
      content: "Offer is sent to AnujK@gmail.com",
    });
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 24,
          marginLeft: 48,
          marginRight: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {restaurantName !== "Restaurant name" && (
            <>
              <img
                src={logo}
                style={{
                  width: 48,
                  height: 48,
                }}
              />
              <span
                style={{
                  fontFamily: "Roboto",
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: 24,
                  marginLeft: 8,
                }}
              >
                {restaurantName}
              </span>
            </>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <Dropdown overlay={cityList} trigger={["click"]}>
            <Button>
              <Space>
                {showCity}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown overlay={restaurantOptions} trigger={["click"]}>
            <Button style={{ marginLeft: 8 }}>
              <Space>
                {restaurantName}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button
            type="primary"
            style={{ marginLeft: 8 }}
            icon={<PlusOutlined />}
            onClick={() => history.push("/onBoarding")}
          >
            Register Restaurant
          </Button>
        </div>
      </div>
      <Divider />
      <div style={{ marginLeft: 48, marginRight: 48, marginTop: 48 }}>
        <Table
          dataSource={list}
          bordered
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} posts`,
          }}
        >
          {columns.map((column) => (
            <Column
              title={column.title}
              key={column.key}
              dataIndex={column.dataIndex}
              {...column}
            />
          ))}
          <Column
            title="Action"
            key="action"
            width={"10%"}
            render={(postDetails) => (
              <Space size="middle" style={{ cursor: "pointer" }}>
                <Button
                  type="primary"
                  style={{ background: "#52C41A" }}
                  onClick={() =>
                    updateContentSatusById(
                      postDetails.id,
                      "Approved",
                      comments
                    ).then(() => {
                      if (restaurantId) {
                        fetchContentByRestaurant(restaurantId);
                      } else if (showCity !== "City/area") {
                        fetchContentByCity(showCity);
                      } else {
                        fetchAllPosts();
                      }
                      approveModal();
                    })
                  }
                >
                  Accept
                </Button>
                <Button
                  title="Delete"
                  danger
                  onClick={() =>
                    toggleShowModal({
                      flag: true,
                      contentId: postDetails.id,
                    })
                  }
                >
                  Reject
                </Button>
              </Space>
            )}
          />
        </Table>
        <Modal
          open={showModal.flag}
          footer={null}
          width={416}
          onCancel={() =>
            toggleShowModal({
              flag: false,
              contentId: "",
            })
          }
        >
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 16,
              }}
            >
              <CloseCircleTwoTone twoToneColor={"#ff4d4f"} />
              <b style={{ marginLeft: 8 }}>Post Rejected</b>
            </div>
            <div style={{ marginLeft: 24 }}>
              <div>AnujK post rejected</div>
              <TextArea
                rows={4}
                style={{ marginTop: 8 }}
                onChange={(e) => updateComments(e.target.value)}
              />
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Button
                  type="primary"
                  disabled={!comments}
                  onClick={() =>
                    updateContentSatusById(
                      showModal.contentId,
                      "Rejected",
                      comments
                    ).then(() => {
                      if (restaurantId) {
                        fetchContentByRestaurant(restaurantId);
                      } else if (showCity !== "City/area") {
                        fetchContentByCity(showCity);
                      } else {
                        fetchAllPosts();
                      }
                      updateComments("");
                      toggleShowModal({
                        flag: false,
                        contentId: "",
                      });
                    })
                  }
                >
                  Done
                </Button>
              </div>
            </div>
          </>
        </Modal>
      </div>
    </>
  );
};
export default ApprovalDashboard;
