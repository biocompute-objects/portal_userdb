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
                usability_domain: [""],
                description_domain: {
                        pipeline_steps :[]
                }
            },
            status: "idle",
            error: null
        }

    },
    reducers: { // list of functions action
        //updateProvenanceDomain: (state, {payload: {val, key}}) => {
        updateProvenanceDomain: (state, action) => {
            state['bco']['data']["provenance_domain"] = action.payload;
            //console.log("Slice Payload", action.payload)
        },
        updateUsability: (state, action) => {
            state['bco']['data']["usability_domain"] = action.payload;
            //console.log("Usability Payload", action.payload["usability_domain"])
        },
        updateDescription: (state, action) => {
            state['bco']['data']["description_domain"] = action.payload;
            //console.log("Usability Payload", action.payload["usability_domain"])
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
        listSelect: (state, action) => {
          if (action.payload.label == 'Contribution' ) {
            state['bco']['data']['provenance_domain']['contributors'][action.payload.index]['contribution']= action.payload.selected
          }
        }
    }
})

export const reducer = rootSlice.reducer;

export const { addContribution, removeContribution, updateProvenanceDomain, updateUsability, updateDescription, deleteEmbargo, addEmbargo, listSelect } = rootSlice.actions;