const axios = require("axios");

const BASE_URL = "https://api.unsplash.com/photos/random";

const getImages = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/?client_id=${process.env.API_KEY}`,
    { params: { collections: "vJBXvebhepg" } }
  );
  return data;
};

module.exports = { getImages };
