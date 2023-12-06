import axios from "axios";

export const BASE_URL = "https://api.nakhlah.xyz";

const token =
  "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getMap = {
  purpose: `${BASE_URL}/api/learning-purposes?populate=*`,
};

export const getHandler = async (key) => {
  try {
    const response = await axios.get(getMap[key], config);
    return response;
  } catch (err) {
    return err;
  }
};

export const postHandler = async (endpoint, body) => {
  try {
    const response = await axios.post(BASE_URL + endpoint, body, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const putHandler = async (endpoint, data) => {
  try {
    const response = await axios.patch(`${BASE_URL + endpoint}`, data, config);
    return response;
  } catch (err) {
    return err;
  }
};
export const deleteHandler = async (endpoint, data) => {
  try {
    const response = await axios.patch(`${BASE_URL + endpoint}`, data, config);
    return response;
  } catch (err) {
    return err;
  }
};
