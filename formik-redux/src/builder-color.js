import React from 'react';
import { DescriptionDomain } from './descriptionDomain';
import { ProvenanceDomain } from './provenanceDomain';
import { UsabilityDomain } from './usabilityDomain';

import { useSelector } from 'react-redux'

export const  BuilderColorCode = () => {
    const state = useSelector(state=>state)
    return (
        <>
            <ProvenanceDomain/>
            <UsabilityDomain/>
            <DescriptionDomain/>
            <br/>
            <button>
                Submit
            </button>
            <pre>{JSON.stringify(state,null, 2)}</pre>
        </>
    )
}