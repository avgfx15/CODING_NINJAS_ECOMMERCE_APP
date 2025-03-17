// | import createAsyncThunk
import { createAsyncThunk } from "@reduxjs/toolkit";

// |import axios
import axios from "axios";

// + Create Or Add New Product
export const addNewProductAction = createAsyncThunk(
  "product/addNewProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/products",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
