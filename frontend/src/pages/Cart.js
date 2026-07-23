import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handlePayment = async () => {
    try {
      // Create Razorpay Order
      const { data } = await API.post("/payment/create-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_TGpObp8IAep1J9",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "PickPerfect",
        description: "Shopping Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            // Verify Payment
            const verify = await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verify.data.success) {
              // Save Order
              await API.post("/orders/add", {
                products: cart,
                totalAmount: total,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                paymentStatus: "Paid",
              });

              alert("✅ Payment Successful & Order Placed!");

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
          name: "Customer",
          email: "customer@gmail.com",
          contact: "9876543210",
        },

        theme: {
          color: "#3399cc",
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

        <br />
        <br />

       <button
  onClick={() => {
    window.location.href = "/products";
  }}
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