import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  Admin_URL,
  LearningStartingPointAddItem_URL,
  LearningLevelAddItem_URL,
  LearningLevelGetAllItem_URL,
  LearningPurposeAddItem_URL,
  LearningPurposeGetAllItem_URL,
} from "@/components/url";

//  static data
import {
  staticJourneyData,
  staticLessonData,
  staticLevelData,
  staticUnitData,
} from "../components/data";

const token =
  "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// const store_mode = "live";
const is_store_mode_static = true;

//  admin login or not check
const KEY = "isAdminLogin";

const getInitialLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(KEY) || false;
  } else {
    return null;
  }
};

// use left navbar
export const useNavbarState = create(
  immer((set) => ({
    isOpen: true,
    toggleNavbar: () => set((state) => ({ isOpen: !state.isOpen })),
  }))
);

// admin login , forget password, reset password
export const useAdminAuth = create(
  immer((set) => ({
    errorMessage: "",
    isAdminLogin: getInitialLoggedIn(),
    adminAuth: async (values) => {
      try {
        const response = await axios.post(`${Admin_URL}/login`, {
          ...values,
        });
        if (response.status === 200) {
          localStorage.setItem(KEY, true);
          set((state) => {
            state.isAdminLogin = true;
          });
        }
        return response;
      } catch (error) {
        set((state) => {
          state.errorMessage = "Bad Request 400";
        });
      }
    },
    AdminLogout: async () =>
      set((state) => {
        localStorage.removeItem(KEY);
        state.isAdminLogin = false;
      }),
  }))
);

export const useJourney = create(
  immer((set) => ({
    data: is_store_mode_static ? staticJourneyData : [],

    existance: (jouneyName) => {
      return staticJourneyData.find((item) => item.title === jouneyName);
    },

    addStatic: (data) => {
      set((state) => {
        state.data = [...state.data, data];
      });
    },
    updateStatic: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return { ...item, title: data.title };
          } else {
            return item;
          }
        });
      });
    },
    removeStatic: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
    reset: () => {
      set((state) => {
        state.data = staticJourneyData;
      });
    },
    addNewJourney: async (formData, url) => {
      return await axios.post(url, formData, config);
    },
    getJournies: async (URL) => {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        set((state) => {
          state.data = response.data;
        });
      }
    },
  }))
);
export const useTaskUnit = create(
  immer((set) => ({
    data: is_store_mode_static ? staticUnitData : [],

    addStatic: (data) => {
      set((state) => {
        state.data = [...state.data, data];
      });
    },
    existance: (journeyId, taskName) => {
      return staticUnitData.find(
        (item) => item.title === taskName && item.journey.id === journeyId
      );
    },
    updateStatic: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    removeStatic: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
    filteredUnits: (id) => {
      // set((state) => {
      const filteredUnits = staticUnitData.filter((item) => {
        return item.journey.id === id;
      });
      return filteredUnits;
      // state.data = filteredUnits;
      // });
    },
    reset: () => {
      set((state) => {
        state.data = staticUnitData;
      });
    },

    addNewTaskUnit: async (formData, url) => {
      return await axios.post(url, formData, config);
    },
    getTaskUnits: async (URL) => {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        set((state) => {
          state.data = response.data;
        });
      }
    },
  }))
);

export const useLevel = create(
  immer((set) => ({
    data: is_store_mode_static ? staticLevelData : [],

    existance: (unitId, levelName) => {
      return staticLevelData.find(
        (item) => item.title === levelName && item.unit.id === unitId
      );
    },
    addStatic: (data) => {
      set((state) => {
        state.data = [...state.data, data];
      });
    },
    updateStatic: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    removeStatic: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
    filteredLevels: (id) => {
      // set((state) => {
      const filteredLevels = staticLevelData.filter((item) => {
        return item.unit.id === id;
      });
      return filteredLevels;
      //   });
    },
    reset: () => {
      set((state) => {
        state.data = staticLevelData;
      });
    },

    addNewLevel: async (formData, url) => {
      return await axios.post(url, formData, config);
    },
    getLevels: async (URL) => {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        set((state) => {
          state.data = response.data;
        });
      }
    },
  }))
);
export const useLesson = create(
  immer((set) => ({
    data: is_store_mode_static ? staticLessonData : [],
    existance: (levelId, lessonName) => {
      return staticLessonData.find(
        (item) => item.title === lessonName && item.level.id == levelId
      );
    },
    addStatic: (data) => {
      set((state) => {
        state.data = [...state.data, data];
      });
    },
    updateStatic: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    removeStatic: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
    addNewLesson: async (formData, url) => {
      return await axios.post(url, formData, config);
    },
    getLessons: async (URL) => {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        set((state) => {
          state.data = response.data;
        });
      }
    },
  }))
);

export const useModal = create(
  immer((set) => ({
    data: { isModalForEdit: false, modaldata: {} },

    updateLesson: (id, data) => {
      set((state) => {
        state.data = [...state.data, data];
      });
    },
  }))
);

// crud operation in dashboard get start
export const useLearningState = create(
  immer((set) => ({
    data: [],
    addItem: async (formData, url) => {
      return await axios.post(url, formData, config);
    },
    getAllItem: async (URL) => {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        set((state) => {
          state.data = response.data;
        });
      }
    },
  }))
);
