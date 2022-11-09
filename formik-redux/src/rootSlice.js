import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        object_id: "",
        spec_version: "https://w3id.org/ieee/ieee-2791-schema/2791object.json",
       etag: "",
       provenance_domain: {
            name: '',
            version: '',
            created: "",
            modified: ""
       },
       usability_domain: [""],
       description_domain: {
            pipeline_steps :[]
       }


    },
    reducers: { // list of functions action
        //updateProvenanceDomain: (state, {payload: {val, key}}) => {
        updateProvenanceDomain: (state, action) => {
            state["provenance_domain"] = action.payload;
            //console.log("Slice Payload", action.payload)
        },
        updateUsability: (state, action) => {
            state["usability_domain"] = action.payload
            //console.log("Usability Payload", action.payload["usability_domain"])
        },
        updateDescription: (state, action) => {
            state["description_domain"] = action.payload
            //console.log("Usability Payload", action.payload["usability_domain"])
        }

    }
})

export const reducer = rootSlice.reducer;

export const { updateProvenanceDomain, updateUsability, updateDescription } = rootSlice.actions;