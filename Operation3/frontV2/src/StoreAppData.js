import React, { useReducer, createContext } from 'react';

export const initialAppDataState = {
    accounts: {}, // [] ?,
    username: 'connect to retrieve',
    memberStatus: null,
    userId: 'connect to retrieve',
    postingKey: 'connect to retrieve',
    isSpsBotRunning: false,
    spsTotalBalance: null,
    spsGainThisWeek: null,
    spsAtBeginning: null, // store total sps account at time of first Sps AutoCompound
    spsBottingResults: null,
}

export const AppDataStoreContext = createContext(initialAppDataState);

export function reducer(state, action) {
    switch (action.type) {
        case 'setAppData':
            return {
                ...state,
                accounts: action.userAccounts,
                username: action.username,
                memberStatus: action.memberStatus,
                userId: action.userId,
                postingKey: action.postingKey,
                isSpsBotRunning: action.isSpsBotRunning,
                spsTotalBalance: action.spsTotalBalance,
                spsGainThisWeek: action.spsGainThisWeek,
                spsAtBeginning: action.spsAtBeginning,
                spsBottingResults: action.spsBottingResults,

            };

        default:
            throw new Error();
    }
}

export const AppDataStoreContainer = ({ children }) => {
    const [stateAppData, dispatchAppData] = useReducer(reducer, initialAppDataState);

    return (
        <AppDataStoreContext.Provider value={{ stateAppData, dispatchAppData }}>
            {children}
        </AppDataStoreContext.Provider>
    )
}



