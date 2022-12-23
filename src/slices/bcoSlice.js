import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
const bcoSlice = createSlice({
  name: "biocompute",
  initialState: {
    data: {
      object_id: '',
      spec_version: "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
      etag: '',
      provenance_domain: {
        name: '',
        version: '',
        license: '',
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
      extension_domain: []
    },
    status: "idle",
    error: null
  },

  reducers: { // list of functions action
    updateProvenanceDomain: (state, action) => {
      state['bco']['data']["provenance_domain"] = action.payload;
    },
    addExtensionDomain: (state, action) => {
        console.log('action',action.payload)
        state['bco']['data']["extension_domain"].push(action.payload);
    },
    deleteExtensionDomain: (state, action) => {
        state['bco']['data']['extension_domain'].splice(action.payload.index,1)
    },
    updateExtensionDomain: (state, action) => {
        state['bco']['data']["extension_domain"][action.payload.index] = action.payload.formData;
    },
    updateModified: (state, action) => {
        state['bco']['data']["provenance_domain"]["modified"] = new Date().toISOString().split(".")[0]
        console.log("modified", state['bco']['data']["provenance_domain"]["modified"])
    },
    updateUsability: (state, action) => {
        state['bco']['data']["usability_domain"] = action.payload;
    },
    addUsability: (state, action) => {
        state['bco']['data']["usability_domain"].push('')
    },
    updateDescription: (state, action) => {
        state['bco']['data']["description_domain"] = action.payload;
    },
    updateParametricDomain: (state, action) => {
        state['bco']['data']["parametric_domain"] = action.payload;
    },
    updateIODomain: (state, action) => {
        state['bco']['data']["io_domain"] = action.payload;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchBco.pending, (state, action) => {
        console.log('loading',action)
        state.status = 'loading'
    })
    .addCase(fetchBco.fulfilled, (state, action) => {
        console.log(typeof action.payload)
        state.status = 'succeeded'
        state.status = 'idle'
        console.log('success', action.payload)
        state.data = action.payload
    })
    .addCase(fetchBco.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
  }
})

export const fetchBco = createAsyncThunk('fetchBco', async (objectInfo) => {
    console.log(objectInfo[1])
    const data = await fetch(`${objectInfo[0]}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${objectInfo[1]}`,
          'Content-type': 'application/json; charset=UTF-8'
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
    alert(`${objectInfo[0]} says: Something went wrong. ${error}`);
      console.log('error', error);
    })
    return data
})

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
    deleteExtensionDomain
} = bcoSlice.actions;
