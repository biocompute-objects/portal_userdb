import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
const rootSlice = createSlice({
    name: "root",
    initialState: {
       bco: {
            data: {
                object_id: '',
                spec_version: "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
                etag: '',
                provenance_domain: {
                    name: '',
                    version: '',
                    license: '',
                    created: new Date().toISOString().split(".")[0],
                    modified: new Date().toISOString().split(".")[0],
                },
                usability_domain: [],
                description_domain: {
                    pipeline_steps :[]
                },
                parametric_domain:[],
                io_domain: {}
            },
            status: "idle",
            error: null
        }

    },
    reducers: { // list of functions action
        updateProvenanceDomain: (state, action) => {
            state['bco']['data']["provenance_domain"] = action.payload;
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
        deleteObsolete: (state, action) => {
            delete state['bco']['data']["provenance_domain"]["obsolete_after"]
        },
        addObsolete: (state, action) => {
            state['bco']['data']["provenance_domain"]["obsolete_after"] = new Date().toISOString().split(".")[0]
        },
        deleteEmbargo: (state, action) => {
            delete state['bco']['data']["provenance_domain"]["embargo"]
        },
        addEmbargo: (state, action) => {
            state['bco']['data']["provenance_domain"]["embargo"] = {start_time: "",end_time:""}
        },
        removeContribution: (state, action)=> {
            state['bco']['data']['provenance_domain']['contributors'].splice(action.payload.index,1)
        },
        addContribution: (state, action)=> {
            if (!state['bco']['data']['provenance_domain']['contributors']) {
              state['bco']['data']['provenance_domain']['contributors'] = [{name:'', affiliation: '', email: '', contribution: [], orcid: ''}]
            } else {
              state['bco']['data']['provenance_domain']['contributors'].push({name:'', affiliation: '', email: '', contribution: [], orcid: ''});
            }
        },
        removeReview: (state, action)=> {
            console.log(action.payload.index)
            state['bco']['data']['provenance_domain']['review'].splice(action.payload.index,1)
        },
        addReview: (state, action)=> {
            if (!state['bco']['data']['provenance_domain']['review']) {
              state['bco']['data']['provenance_domain']['review'] = [{status:'unreviewed',reviewer_comment:'',date:'',reviewer:{name:'',affiliation:'',email:'',contribution:['curatedBy'],orcid: ''}}];
            } else {
                state['bco']['data']['provenance_domain']['review'].push({status:'unreviewed',reviewer_comment:'',date:'',reviewer: {name:'',affiliation: '',email:'',contribution:['curatedBy'],orcid:''}});
            }
        },
        listSelect: (state, action) => {
          if (action.payload.label === 'Contribution' ) {
            console.log('NOT Review')
            state['bco']['data']['provenance_domain']['contributors'][action.payload.index]['contribution']= action.payload.selected
          }
          if (action.payload.label === 'Review') {
            state['bco']['data']['provenance_domain']['review'][action.payload.index]['status']= action.payload.selected
          }
          if (action.payload.label === 'Reviewer Contribution') {
            state['bco']['data']['provenance_domain']['review'][action.payload.index]['reviewer']['contribution']= action.payload.selected
          }
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
            state.bco.status = 'loading'
        })
        .addCase(fetchBco.fulfilled, (state, action) => {
            state.bco.status = 'succeeded'
            state.bco.status = 'idle'
            console.log('success', action.payload)
            state.bco.data = action.payload
        })
        .addCase(fetchBco.rejected, (state, action) => {
            state.bco.status = 'failed'
            state.bco.error = action.error.message
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

export const reducer = rootSlice.reducer;
export const bcoStatus = state => state.bco.status
export const { 
    addObsolete,
    deleteObsolete,
    addReview,
    removeReview,
    addContribution,
    removeContribution,
    updateProvenanceDomain,
    updateUsability,
    addUsability,
    updateDescription,
    deleteEmbargo,
    addEmbargo,
    listSelect,
    updateParametricDomain,
    updateIODomain,
    updateModified
} = rootSlice.actions;
