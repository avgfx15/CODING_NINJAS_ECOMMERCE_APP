// @ Create Function variable
const generateGoogleMapsUrl = async (address) => {
  // Format the address correctly
  const formattedAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`;

  // Encode address for URL
  const encodedAddress = encodeURIComponent(formattedAddress);

  // Generate Google Maps URL
  return `https://www.google.com/maps/search/?q=${encodedAddress}`;
};

export default generateGoogleMapsUrl;
