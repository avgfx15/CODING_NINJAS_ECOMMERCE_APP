export const userTestController = async (req, res) => {
  try {
    res.status(200).json({ message: "User Route is working", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
