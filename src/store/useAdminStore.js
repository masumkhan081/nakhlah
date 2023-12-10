import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import {
  Admin_URL,
  LearningStartingPointAddItem_URL,
  LearningLevelAddItem_URL,
  LearningLevelGetAllItem_URL,
  LearningPurposeAddItem_URL,
  LearningPurposeGetAllItem_URL,
} from "../lib/url";

//  static data
import {
  staticConType,
  staticConTypeCategory,
  staticJourneyData,
  staticLessonData,
  staticLevelData,
  staticQueType,
  staticUnitData,
} from "../static-data/data";
import {
  deleteHandler,
  getHandler,
  postHandler,
  putHandler,
} from "@/lib/requestHandler";

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

// ______________________________________  learning section

export const useLearnerPurpose = create(
  immer((set) => ({
    data: [],
    setPurposes: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("purpose", id, {
            data,
          })
        : await postHandler("purpose", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            time: data.attributes.time,
            goal: data.attributes.goal,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearnerLevel = create(
  immer((set) => ({
    data: [],
    setGoals: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("goal", id, {
            data,
          })
        : await postHandler("goal", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            //  work left
            time: data.attributes.time,
            goal: data.attributes.goal,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    removeGoal: async (id) => {
      const response = await deleteHandler("goal", id);

      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: "Deleted Successfully",
          id: data.id,
        };
      } else if (response.status == 400) {
        return response.data.error.message;
      }
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearnerStartPoint = create(
  immer((set) => ({
    data: [],
    setStartPoints: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learner-start-point", id, {
            data,
          })
        : await postHandler("learner-start-point", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            time: data.attributes.time,
            goal: data.attributes.goal,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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

    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearnerGoal = create(
  immer((set) => ({
    data: [],
    setGoals: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("goal", id, {
            data,
          })
        : await postHandler("goal", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            time: data.attributes.time,
            goal: data.attributes.goal,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    removeGoal: async (id) => {
      const response = await deleteHandler("goal", id);

      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: "Deleted Successfully",
          id: data.id,
        };
      } else if (response.status == 400) {
        return response.data.error.message;
      }
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useQueType = create(
  immer((set) => ({
    data: [],
    setQueTypes: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("question-type", id, {
            data,
          })
        : await postHandler("question-type", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useConType = create(
  immer((set) => ({
    data: [],
    setConTypes: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-type", id, {
            data,
          })
        : await postHandler("content-type", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useConTypeCategory = create(
  immer((set) => ({
    data: [],
    setConTypeCategories: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-type-category", id, {
            data,
          })
        : await postHandler("content-type-category", {
            data,
          });
      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningJourney = create(
  immer((set) => ({
    data: [],
    setJournies: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learning-journey", id, {
            data,
          })
        : await postHandler("learning-journey", {
            data,
          });
      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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

    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningUnit = create(
  immer((set) => ({
    data: [],

    setUnits: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {},
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningLevel = create(
  immer((set) => ({
    data: [],

    setLevels: (data) => {
      set((state) => {
        state.data = data;
      });
    },

    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningLesson = create(
  immer((set) => ({
    data: [],
    setLessons: (data) => {
      set((state) => {
        state.data = data;
      });
    },

    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
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
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
// _______________________________________  learning section

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
export const useLearningState = create(
  immer(
    subscribeWithSelector((set) => ({
      data: [],
      addNewItem: false,
      addItem: async (formData, url) => {
        const response = await axios.post(url, formData, config);
        set((state) => {
          state.addNewItem = true;
        });
        return response;
      },
      getAllItem: async (url) => {
        const response = await axios.get(url, config);
        if (response.status === 200) {
          set((state) => {
            state.data = response.data;
          });
          set((state) => {
            state.addNewItem = false;
          });
        }
      },
    }))
  )
);
