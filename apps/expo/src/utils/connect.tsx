const API_URL = "http://192.168.83.44:5500/src/utils/MOCK_DATAcopy.json";

export async function getProducts() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return Promise.resolve(data);
}
