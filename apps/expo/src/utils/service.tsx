const URL_API = "http://192.168.115.44:5500/src/utils";

export const getOrders = async () => {
  try {
    const response = await globalThis.fetch(`${URL_API}/MOCK_ORDER.json`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};

export const getOrderDet = async () => {
  try {
    const response = await globalThis.fetch(`${URL_API}/MOCK_ORDER_DET.json`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};

export const getUser = async () => {
  try {
    const response = await globalThis.fetch(`${URL_API}/MOCK_USER.json`);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};

export const getProduct = async () => {
  try {
    const response = await globalThis.fetch(`${URL_API}/MOCK_PROD.json`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};

export const getProfile = async () => {
  try {
    const response = await globalThis.fetch(`${URL_API}/MOCK_PROF.json`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};
