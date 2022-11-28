import { createSlice} from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
       bco: {
            data: {
                object_id: "",
                spec_version: "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
                etag: "",
                provenance_domain: {
                    name: 'abc',
                    version: '',
                    license: "",
                    created: new Date().toISOString().split(".")[0],
                    modified: new Date().toISOString().split(".")[0],
                },
                usability_domain: [],
                description_domain: {
                    pipeline_steps :[]
                }
            },
            status: "idle",
            error: null
        }

    },
    reducers: { // list of functions action
        updateProvenanceDomain: (state, action) => {
            state['bco']['data']["provenance_domain"] = action.payload;
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
        }
    }
})

export const reducer = rootSlice.reducer;

export const { addObsolete, deleteObsolete, addReview, removeReview, addContribution, removeContribution, updateProvenanceDomain, updateUsability, addUsability, updateDescription, deleteEmbargo, addEmbargo, listSelect } = rootSlice.actions;