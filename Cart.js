import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");

      if (res.data.success) {
        const userCart = res.data.cart.filter(
          (item) => item.user === user?._id
        );

        setCart(userCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      fetchCart();

      alert("✅ Item Removed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handlePayment = async () => {
    try {
      const { data } = await API.post("/payment/create-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_TGpObp8IAep1J9",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "PickPerfect",
        description: "Shopping Payment",
        order_id: data.order.id,        handler: async function (response) {
          try {
            const verify = await API.post(
              "/payment/verify-payment",
              {
                razorpay_order_id:
                  response.razorpay_order_id,
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            if (verify.data.success) {
              // Save Order
              await API.post("/orders/add", {
                user: user._id,

                products: cart.map((item) => ({
                  product: item.product._id,
                  quantity: item.quantity,
                })),

                totalPrice: total,

                paymentId:
                  response.razorpay_payment_id,

                orderId:
                  response.razorpay_order_id,

                paymentStatus: "Paid",
              });

              alert("✅ Payment Successful");

              // Clear Cart
              for (let item of cart) {
                await API.delete(`/cart/${item._id}`);
              }

              navigate("/orders");
            } else {
              alert("❌ Payment Verification Failed");
            }
          } catch (error) {
            console.log(error);
            alert("Verification Failed");
          }
        },

        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        theme: {
          color: "#6C63FF",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };
    return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#fff",
          borderRadius: "15px",
          padding: "30px",
        }}
      >
        <h1>🛒 My Cart</h1>

        <hr />

        {cart.length === 0 ? (
          <h3>Your Cart is Empty</h3>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "15px",
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3>{item.product.name}</h3>

              <p>Price : ₹{item.product.price}</p>

              <p>Quantity : {item.quantity}</p>

              <button
                onClick={() => removeItem(item._id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}

        <h2>Total : ₹{total}</h2>

        {cart.length > 0 && (
          <button
            onClick={handlePayment}
            style={{
              marginTop: "20px",
              padding: "12px 30px",
              background: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            💳 Pay with Razorpay
          </button>
        )}

        <br />
        <br />

        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "12px 25px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart;