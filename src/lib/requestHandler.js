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
  "learner-purpose": `${BASE_URL}/api/learning-purposes`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "question-type": `${BASE_URL}/api/question-types`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  "learning-level": `${BASE_URL}/api/learning-journey-levels?populate[learning_journey_unit][populate][0]=learning_journey`,
  // task: `${BASE_URL}/api/learning-journey-units?populate=learning_journey`,
  // level: `${BASE_URL}/api/learner-levels?populate=*`,
  // lesson: `${BASE_URL}/api/learning-journey-lessons?populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`,
};

const postMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "question-type": `${BASE_URL}/api/question-types`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  // level: `${BASE_URL}/api/learner-levels?populate=*`,
  // task: `${BASE_URL}/api/learning-journey-units?populate=learning_journey`,
  // lesson: `${BASE_URL}/api/learning-journey-lessons?populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`,
};
const putMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "question-type": `${BASE_URL}/api/question-types`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  // level: `${BASE_URL}/api/learner-levels?populate=*`,
  // task: `${BASE_URL}/api/learning-journey-units?populate=learning_journey`,
  // lesson: `${BASE_URL}/api/learning-journey-lessons?populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`,
};
const deleteMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "question-type": `${BASE_URL}/api/question-types`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  // level: `${BASE_URL}/api/learner-levels?populate=*`,
  // task: `${BASE_URL}/api/learning-journey-units?populate=learning_journey`,
  // lesson: `${BASE_URL}/api/learning-journey-lessons?populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`,
};

export const getHandler = async (key) => {
  try {
    const response = await axios.get(getMap[key], config);
    return response;
  } catch (err) {
    return err;
  }
};

export const postHandler = async (key, body) => {
  try {
    const response = await axios.post(postMap[key], body, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const putHandler = async (key, id, data) => {
  try {
    const response = await axios.put(putMap[key] + `/${id}`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteHandler = async ({ key, id }) => {
  try {
    const response = await axios.delete(deleteMap[key] + `/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};
