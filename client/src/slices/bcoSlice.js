import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import BcoService from "../services/bco.service";
import { setMessage } from "../slices/messageSlice";

const bcoSlice = createSlice({
  name: "biocompute",
  initialState: {
    data: {
      object_id: "",
      spec_version: "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
      etag: "",
      provenance_domain: {
        name: "",
        version: "",
        license: "",
        created: new Date().toISOString().split(".")[0],
        modified: new Date().toISOString(),
        contributors: []
      },
      usability_domain: [],
      description_domain: {
        pipeline_steps :[]
      },
      parametric_domain:[],
      io_domain: {},
      execution_domain: {
        "script":[],
        "script_driver": "", // "hive", "cwl-runner", "shell"
        "software_prerequisites": [],
        "external_data_endpoints":[],
        "environment_variables": {}
      },
      extension_domain: []
    },
    prefix: null,
    status: "idle",
    error: null
  },
  reducers: { // list of functions action
    updateProvenanceDomain: (state, action) => {
      state["data"]["provenance_domain"] = action.payload;
    },
    addExtensionDomain: (state, action) => {
      console.log("action",action.payload)
      state["data"]["extension_domain"].push(action.payload);
    },
    deleteExtensionDomain: (state, action) => {
      state["data"]["extension_domain"].splice(action.payload.index,1)
    },
    updateExtensionDomain: (state, action) => {
      state["data"]["extension_domain"][action.payload.index] = action.payload.formData;
    },
    updateExecutionDomain: (state, action) => {
      state["data"]["execution_domain"] = action.payload.formData;
      state["data"]["execution_domain"]["environment_variables"] = action.payload.envars
    },
    updateModified: (state) => {
      state["data"]["provenance_domain"]["modified"] = new Date().toISOString().split(".")[0]
      console.log("modified", state["data"]["provenance_domain"]["modified"])
    },
    updateUsability: (state, action) => {
      state["data"]["usability_domain"] = action.payload;
    },
    addUsability: (state) => {
      state["data"]["usability_domain"].push("")
    },
    updateDescription: (state, action) => {
      state["data"]["description_domain"] = action.payload;
    },
    updateParametricDomain: (state, action) => {
      state["data"]["parametric_domain"] = action.payload;
    },
    updateIODomain: (state, action) => {
      state["data"]["io_domain"] = action.payload;
    },
    setPrefix: (state, action) => {
      state["prefix"] = action.payload
    },
    updateETag: (state, action) => {
      state["data"]["etag"] = action.payload
    },
    updateBco: (state, action) => {
      state["data"] = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getDraftBco.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getDraftBco.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.status = "idle"
        state.data = action.payload
        state.prefix = action.payload["object_id"].split("/")[3].split("_")[0]
      })
      .addCase(getDraftBco.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(getPubBco.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getPubBco.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.status = "idle"
        console.log(action.payload)
        state.data = action.payload
      })
      .addCase(getPubBco.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(createDraftBco.fulfilled, (state, action) => {
        state.data.object_id = action.payload[0].object_id
        state.error = "null"
        state.status = "idle"
      })
      .addCase(createDraftBco.rejected, (state) => {
        state.status = "rejected"
      })
      .addCase(updateDraftBco.rejected, (state) => {
        state.status = "rejected"
        state.error = "null"
      })
      .addCase(updateDraftBco.fulfilled, (state) => {
        state.status = "idle"
        state.error = "null"
      })
      .addCase(validateBco.fulfilled, (state, action) => {
        if (action.payload === 200) {
          state.status = "valid"
          state.error = "null"
        } else {
          console.log(action)
          state.status = "invalid"
          state.error = action.payload
        }
      })
  }
})

export const createDraftBco = createAsyncThunk(
  "createDraft",
  async ({bcoURL, bcoObject}, thunkAPI) => {
    try {
      console.log("bcoURL: ", bcoURL);
      const response = await BcoService.createDraftBco(bcoURL, bcoObject);
      thunkAPI.dispatch(setMessage(response.data[0].message))
      return response.data;
    } catch(error) {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const updateDraftBco = createAsyncThunk(
  "updateDraft",
  async ({bcoURL, bcoObject}, thunkAPI) => {
    try {
      console.log("bcoURL: ", bcoURL);
      const response = await BcoService.updateDraftBco(bcoURL, bcoObject);
      thunkAPI.dispatch(setMessage(response.data[0].message))
      return response.data;
    } catch(error) {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const publishDraftBco = createAsyncThunk(
  "publishDraft",
  async ({prefix, bcoURL, bcoObject}, thunkAPI) => {
    try {
      console.log("bcoURL: ", bcoURL);
      const response = await BcoService.publishDraftBco(prefix, bcoURL, bcoObject);
      thunkAPI.dispatch(setMessage(response.data[0].message))
      return response.data;
    } catch(error) {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const validateBco = createAsyncThunk(
  "validate",
  async ({bcoURL, bcoObject}, thunkAPI) => {
    try {
      const response = await BcoService.validateBco(bcoURL, bcoObject);
      if (response.status === 207) {
        return response.data
      }
      if (response.status === 200) {
        thunkAPI.dispatch(setMessage("BCO is valid"))
        return 200;
      } 
    } catch(error) {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const addExtension = createAsyncThunk(
  "addExtension",
  async ({newSchema}, thunkAPI) => {
    try {
      const schema = await BcoService.addExtension(newSchema);
      return schema;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const getDraftBco = createAsyncThunk(
  "getDraft",
  async (object_id, thunkAPI) => {
    try {
      const response = await BcoService.getDraftBco(object_id);
      return response.data;
    } catch(error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const getPubBco = createAsyncThunk(
  "getPub",
  async (object_id, thunkAPI) => {
    try {
      const response = await BcoService.getPubBco(object_id);
      return response.data[0];
    } catch(error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const bcoReducer = bcoSlice.reducer;
export const bcoStatus = state => state.bco.status
export const {
  updateProvenanceDomain,
  updateUsability,
  addUsability,
  updateDescription,
  updateParametricDomain,
  updateIODomain,
  updateModified,
  updateExtensionDomain,
  addExtensionDomain,
  deleteExtensionDomain,
  updateExecutionDomain,
  setPrefix,
  updateETag,
  updateBco,
} = bcoSlice.actions;