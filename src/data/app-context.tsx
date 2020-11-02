import React from 'react';

export interface Profile {
    username?: string,
    latitude?: number | null,
    longitude?: number | null,
}

export const defaultProfile: Profile = {
    username: '',
    latitude: null,
    longitude: null,
}

interface AppContext {
    initContext: () => void,
    profile: Profile,
    updateProfile: (updatedProfile: Profile) => void
}

const AppContext = React.createContext<AppContext>({
    initContext: () => { },
    profile: defaultProfile,
    updateProfile: () => { },
});

export default AppContext