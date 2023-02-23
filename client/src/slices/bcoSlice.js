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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBco.pending, (state, action) => {
        console.log("loading",action)
        state.status = "loading"
      })
      .addCase(fetchBco.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.status = "idle"
        state.data = action.payload
      })
      .addCase(fetchBco.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(getDraftBco.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getDraftBco.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.status = "idle"
        state.data = action.payload
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
        console.log(action.payload.data)
        state.data = action.payload
      })
      .addCase(getPubBco.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(createDraftBco.fulfilled, (state, action) => {
        console.log(action.payload[0].object_id)
        state.data.object_id = action.payload[0].object_id
      })
  }
})

export const fetchBco = createAsyncThunk(
  "fetchBco",
  async (objectInfo) => {
    console.log(objectInfo[1])
    const data = await fetch(`${objectInfo[0]}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${objectInfo[1]}`,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
    return data
  })

export const createDraftBco = createAsyncThunk(
  "createDraft",
  async ({bcoURL, bcoObject}, thunkAPI) => {
    try {
      console.log("bcoURL: ", bcoURL);
      const response = await BcoService.createDraftBco(bcoURL, bcoObject);
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
  async ({bcodbInfo, object_id}, thunkAPI) => {
    try {
      const response = await BcoService.getDraftBco(bcodbInfo, object_id);
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
  async ({bcodbInfo, object_id}, thunkAPI) => {
    console.log("Slice", bcodbInfo, object_id)
    try {
      const response = await BcoService.getPubBco(bcodbInfo, object_id);
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
} = bcoSlice.actions;
