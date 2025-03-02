export const productTestController = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Product Route is working", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
