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
        contributors: [{name:"",affiliation:"",email:"",contribution:[],orcid:""}
        ]
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
      extension_domain: [],
      error_domain: {}
    },
    prefix: null,
    status: "idle",
    error: null
  },
  reducers: { // list of functions action
    updateBcoStatus: (state, action) => {
      if (action.payload === true) {
        state["status"] = "writing"
      }
      if (action.payload === false) {
        state["status"] = "idle"
      }
    },
    updateProvenanceDomain: (state, action) => {
      state["data"]["provenance_domain"] = action.payload;
    },
    addExtensionDomain: (state, action) => {
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
    updateErrorDomain: (state, action) => {
      state["data"]["error_domain"] = action.payload
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
  
  deriveBco: (state, action) => {
    const derive = action.payload
    state["data"] = {
      object_id: "",
      spec_version: "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
      etag: "",
      provenance_domain: {
        name: derive.provenance_domain.name,
        version: "",
        license: "",
        derived_from: derive.object_id,
        created: new Date().toISOString().split(".")[0],
        modified: new Date().toISOString(),
        contributors: derive.provenance_domain.contributors,
        review: derive.provenance_domain.review
      },
      usability_domain: derive.usability_domain,
      description_domain: derive.description_domain,
      parametric_domain:derive.parametric_domain,
      io_domain: derive.io_domain,
      execution_domain: derive.execution_domain,
      extension_domain: derive.extension_domain,
    },
    state["prefix"] = null,
    state["status"] = "idle",
    state["error"] = null
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
      .addCase(getDraftBco.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getTempDraftBco.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getTempDraftBco.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(getTempDraftBco.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getPubBco.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getPubBco.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.status = "idle"
        state.data = action.payload
      })
      .addCase(getPubBco.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(createDraftBco.fulfilled, (state, action) => {
        state.data.object_id = action.payload[0].object_id
        state.error = null
        state.status = "idle"
      })
      .addCase(createDraftBco.rejected, (state) => {
        state.status = "rejected"
      })
      .addCase(updateDraftBco.rejected, (state) => {
        state.status = "rejected"
        state.error = null
      })
      .addCase(updateDraftBco.fulfilled, (state) => {
        state.status = "idle"
        state.error = null
      })
      .addCase(validateBco.fulfilled, (state, action) => {
        if (action.payload === 200) {
          state.status = "valid"
          state.error = null
        } else {
          state.status = "invalid"
          state.error = action.payload
        }
      })
      .addCase(getExtension.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(getExtension.rejected, (state, action) => {
        console.log(action)
      })
  }
})

export const createDraftBco = createAsyncThunk(
  "createDraft",
  async ({bcoURL, bcoObject, prefix}, thunkAPI) => {
    try {
      const owner_group = `${prefix.toLowerCase()}_drafter`
      const response = await BcoService.createDraftBco(bcoURL, bcoObject, prefix, owner_group);
      thunkAPI.dispatch(setMessage(response[0].message))
      return response;
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
      const response = await BcoService.updateDraftBco(bcoURL, bcoObject);
      thunkAPI.dispatch(setMessage(response.data.message))
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

export const getExtension = createAsyncThunk(
  "getExtension",
  async ({schemaUrl}, thunkAPI) => {
    try {
      const schema = await BcoService.getExtension(schemaUrl);
      return schema;
    } catch (error) {
      if (error.response.status === 404) {
        const message = `Unable to resolve extension schema URL:
        ${schemaUrl}`
        thunkAPI.dispatch(setMessage(message));
      } else {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        thunkAPI.dispatch(setMessage(message));
      }
      return thunkAPI.rejectWithValue();
    }
  }
)

export const getDraftBco = createAsyncThunk(
  "getDraft",
  async (queryString, thunkAPI) => {
    try {
      const response = await BcoService.getDraftBco(queryString);
      return response.data;
    } catch(error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
    }
    return thunkAPI.rejectWithValue();
  }
)

export const getTempDraftBco = createAsyncThunk(
  "getTempDraftBco",
  async (queryString, thunkAPI) => {
    try {
      const response = await BcoService.getTempDraftBco(queryString);
      return response.data;
    } catch(error) {
      const message =
        (error.response &&
          error.response.data) ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const deleteTempDraftBco = createAsyncThunk(
  "deleteTempDraftBco",
  async (queryString, thunkAPI) => {
    try {
      const response = await BcoService.deleteTempDraftBco(queryString);
      return response.data;
    } catch(error) {
      const message =
        (error.response &&
          error.response.data) ||
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

export const modifyGroup = createAsyncThunk(
  "modifyGroup",
  async (bcodb, request, thunkAPI) => {
    try {
      const response = await BcoService.modifyGroup(bcodb, request);
      // thunkAPI.dispatch(JSON.stringify(response.data[0].message))
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
  updateBcoStatus,
  updateProvenanceDomain,
  updateUsability,
  addUsability,
  deriveBco,
  updateDescription,
  updateParametricDomain,
  updateIODomain,
  updateErrorDomain,
  updateModified,
  updateExtensionDomain,
  addExtensionDomain,
  deleteExtensionDomain,
  updateExecutionDomain,
  setPrefix,
  updateETag,
  updateBco,
} = bcoSlice.actions;