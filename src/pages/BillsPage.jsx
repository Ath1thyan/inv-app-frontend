import { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";
// import "../styles/InvoiceStyle.css";
const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        `https://inv-app-backend.onrender.com/api/bills/get-bills`
      );
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);
  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //able data
  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  // console.log(selectedBill);
  return (
    <DefaultLayout>
      <div className="d-flex color-white justify-content-between">
        <h1>Invoice list</h1>
      </div>

      <Table columns={columns} dataSource={billsData} bordered />

      {popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Invoice Details"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>INV APP</h2>
                <p> Contact : 1234567890 | Delhi, India</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr
                      className="tabletitle"
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        textAlign: "center",
                      }}
                    >
                      <td
                        className="item"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h5>Item</h5>
                      </td>
                      <td
                        className="Hours"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h5>Qty</h5>
                      </td>
                      <td
                        className="Rate"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h5>Price</h5>
                      </td>
                      <td
                        className="Rate"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h5>Total</h5>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td
                            className="tableitem"
                            style={{
                              border: "1px solid black",
                              borderCollapse: "collapse",
                              textAlign: "start",
                            }}
                          >
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td
                            className="tableitem"
                            style={{
                              border: "1px solid black",
                              borderCollapse: "collapse",
                              textAlign: "center",
                            }}
                          >
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td
                            className="tableitem"
                            style={{
                              border: "1px solid black",
                              borderCollapse: "collapse",
                              textAlign: "center",
                            }}
                          >
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td
                            className="tableitem"
                            style={{
                              border: "1px solid black",
                              borderCollapse: "collapse",
                              textAlign: "center",
                            }}
                          >
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td
                        className="Rate"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h5>GST</h5>
                      </td>
                      <td
                        className="payment"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h5>Rs {selectedBill.tax}</h5>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td
                        className="Rate"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h4>Grand Total</h4>
                      </td>
                      <td
                        className="payment"
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "center",
                        }}
                      >
                        <h4>
                          <b>Rs {selectedBill.totalAmount}</b>
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 18% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email @<b> INVAPP@mail.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
