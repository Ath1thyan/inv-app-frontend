import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";

const ProductPage = () => {
  const dispatch = useDispatch();

  const [productsData, setProductsData] = useState([]);

  const [popupModal, setPopupModal] = useState(false);

  const [editItem, setEditItem] = useState(null);

  // const notAllowed = () => {
  //   message.error("This function is not allowed in demo mode");
  // };

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        `https://inv-app-backend.onrender.com/api/products/getProducts`
      );
      setProductsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    getAllItems();
    //eslint-disable-next-line
  }, []);

  // Delete function

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post(
        "https://inv-app-backend.onrender.com/api/products/deleteProduct",
        { itemId: record._id }
      );
      message.success("Item Deleted Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  // Table data

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: "Price (INR)",
      dataIndex: `price`,
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{
              cursor: "pointer",
              // background: "red",
              // padding: "8px",
              // borderRadius: "7px",
              // color: "#fff",
              // fontWeight: "bold",
            }}
            onClick={() => {
              handleDelete(record);
            }}
          />{" "}
        </div>
      ),
    },
  ];

  // handle Submit

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post(
          `https://inv-app-backend.onrender.com/api/products/addProduct`,
          value
        );

        message.success("Item Added Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        console.log("done1111");
        await axios.put(
          "https://inv-app-backend.onrender.com/api/products/editProduct",
          {
            ...value,
            itemId: editItem._id,
          }
        );
        message.success("Item Updated Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Products List</h1>
        <Button
          type="primary"
          onClick={() => {
            setPopupModal(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={productsData} bordered />
      {popupModal && (
        <Modal
          title={`${editItem !== null ? "Edit Product " : "Add New Product"}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
            // onFinish={notAllowed}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
                <Select.Option value="breads">Breads</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ProductPage;
