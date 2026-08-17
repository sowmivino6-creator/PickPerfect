import { useEffect, useState } from "react";
import API from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");

      if (res.data.success) {
        const myOrders = res.data.orders.filter(
          (order) => order.user?._id === user?._id
        );

        setOrders(myOrders);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to Load Orders");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#6C63FF",
          marginBottom: "30px",
        }}
      >
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Orders Found
        </h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "#fff",
              marginBottom: "25px",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <h3>
              Order ID :
              <span style={{ color: "#6C63FF" }}>
                {" "}
                {order._id}
              </span>
            </h3>

            <h3>Total : ₹{order.totalPrice}</h3>

            <h3>
              Payment :
              <span
                style={{
                  color:
                    order.paymentStatus === "Paid"
                      ? "green"
                      : "red",
                }}
              >
                {" "}
                {order.paymentStatus}
              </span>
            </h3>

            <h3>
              Status :
              <span style={{ color: "#ff9800" }}>
                {" "}
                {order.status}
              </span>
            </h3>

            <hr />

            <h3>Products</h3>

            {order.products.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div>
                  <h3>{item.product.name}</h3>
                  <p>Price : ₹{item.product.price}</p>
                  <p>Quantity : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
