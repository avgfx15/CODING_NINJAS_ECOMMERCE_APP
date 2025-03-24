### how to setup our account in razorpay for received payment

### **How to Set Up a Razorpay Account to Receive Payments**

To receive payments in your MERN stack application using Razorpay, follow these steps:

---

## **Step 1: Create a Razorpay Account**

1. Go to [Razorpay](https://razorpay.com/) and **sign up**.
2. Verify your **email address** and **phone number**.
3. Choose the **Business Type** that best describes your business.

---

## **Step 2: Complete KYC (Know Your Customer) Verification**

1. **Go to Razorpay Dashboard → Settings → Account Details → Activate Account**.
2. Provide the required details:
   - **Business Details**: Name, type, PAN, and GST number (if applicable).
   - **Bank Account Details**: Enter your bank details to receive payments.
   - **Business Documents**:
     - PAN Card (Business or Personal)
     - Aadhaar or Voter ID
     - Bank Statement or Cancelled Cheque
   - **Website/App Details**: Enter your website URL or app details.
3. Submit the information and wait for Razorpay to verify (usually takes **24-48 hours**).

---

## **Step 3: Get API Keys for Integration**

1. Once your account is verified, go to **Dashboard → Settings → API Keys**.
2. Click on **Generate Live Keys**.
3. You will get:
   - `Key ID` (Public Key)
   - `Key Secret` (Private Key)
4. **Store these safely** (use `.env` files for security in your project).

---

## **Step 4: Configure API Keys in Your MERN App**

1. **Backend (`.env` file)**

   ```env
   RAZORPAY_KEY_ID=your_live_key_id
   RAZORPAY_KEY_SECRET=your_live_key_secret
   ```

2. **Frontend**
   Replace the `key` in your Razorpay script with your **Live Key**.
   ```js
   const options = {
     key: "your_live_key_id",
     ...
   };
   ```

---

## **Step 5: Test the Integration**

- **Use "Test Mode"** in the Razorpay dashboard for trial payments.
- Switch to **Live Mode** when you're ready to accept real payments.

---

## **Step 6: Set Up Webhooks (Optional, But Recommended)**

Webhooks allow you to receive real-time notifications when a payment succeeds or fails.

1. Go to **Razorpay Dashboard → Webhooks**.
2. Click **Add Webhook**.
3. Enter the webhook URL (`https://yourdomain.com/api/webhook`).
4. Select events like:
   - `payment.authorized`
   - `payment.failed`
   - `order.paid`
5. Save the webhook and implement the endpoint in your backend.

Example:

```js
app.post("/api/webhook", (req, res) => {
  const secret = "your_webhook_secret";

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hmac === req.headers["x-razorpay-signature"]) {
    console.log("Payment received", req.body);
  } else {
    console.log("Invalid signature");
  }

  res.status(200).json({ status: "ok" });
});
```

---

## **Step 7: Start Accepting Payments 🚀**

Now your Razorpay account is **live**, and you can accept payments on your e-commerce platform.

Let me know if you need help! 😊

_How to Set Up in App_
_How to Set Up in App_

# **How to get payment in my MERN stack app using razorpay how to create frontend and backend**

To integrate Razorpay into your MERN stack app, follow these steps:

---

### **Backend (Node.js, Express) Setup**

1. **Install Dependencies:**

   ```sh
   npm install express razorpay dotenv body-parser cors crypto
   ```

2. **Setup Razorpay in the Backend:**

   ```javascript
   import express from "express";
   import Razorpay from "razorpay";
   import dotenv from "dotenv";
   import crypto from "crypto";

   dotenv.config();
   const router = express.Router();

   const razorpayInstance = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_KEY_SECRET,
   });

   // Create Order
   router.post("/create-order", async (req, res) => {
     try {
       const options = {
         amount: req.body.amount * 100, // Convert amount to paise
         currency: "INR",
         receipt: crypto.randomBytes(10).toString("hex"),
       };

       const order = await razorpayInstance.orders.create(options);
       res.json(order);
     } catch (error) {
       res.status(500).json({ message: "Error creating order", error });
     }
   });

   // Verify Payment
   router.post("/verify-payment", async (req, res) => {
     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
       req.body;

     const body = razorpay_order_id + "|" + razorpay_payment_id;
     const expectedSignature = crypto
       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
       .update(body)
       .digest("hex");

     if (expectedSignature === razorpay_signature) {
       res.json({ success: true, message: "Payment Verified" });
     } else {
       res.status(400).json({ success: false, message: "Payment Failed" });
     }
   });

   export default router;
   ```

3. **Add Routes in `server.js`**

   ```javascript
   import express from "express";
   import cors from "cors";
   import paymentRoutes from "./routes/paymentRoutes.js"; // Import the above-created routes

   const app = express();
   app.use(cors());
   app.use(express.json());
   app.use("/api/payments", paymentRoutes);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

---

### **Frontend (React) Setup**

1. **Install Razorpay SDK**

   ```sh
   npm install razorpay
   ```

2. **Create Payment Button Component**

   ```jsx
   import axios from "axios";

   const RazorpayPayment = ({ amount }) => {
     const handlePayment = async () => {
       try {
         const { data: order } = await axios.post(
           "http://localhost:5000/api/payments/create-order",
           { amount }
         );

         const options = {
           key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
           amount: order.amount,
           currency: order.currency,
           order_id: order.id,
           handler: async (response) => {
             await axios.post(
               "http://localhost:5000/api/payments/verify-payment",
               response
             );
             alert("Payment successful!");
           },
           prefill: {
             name: "John Doe",
             email: "johndoe@example.com",
             contact: "9999999999",
           },
         };

         const razorpay = new window.Razorpay(options);
         razorpay.open();
       } catch (error) {
         console.error("Payment error:", error);
       }
     };

     return <button onClick={handlePayment}>Pay Now</button>;
   };

   export default RazorpayPayment;
   ```

---

### **Next Steps**

- Replace `"YOUR_RAZORPAY_KEY_ID"` with your actual key from the Razorpay dashboard.
- Implement an order confirmation page after successful payment.
- Store payment details in MongoDB for future reference.

Let me know if you need help! 🚀
