import { createContext, useState } from 'react';

import { getProfile } from '../utils/api';

import useAuth from '../hooks/useAuth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [type, setType] = useState(null);
    const { logout } = useAuth();

    const fetchUserProfile = async () => {
        try {
            const profile = await getProfile();
            console.log('Fetched user profile: ', profile);
            setUser(profile);
        } catch (error) {
            console.error('Error fetching candidate profile:', error);
            if (error.status == 401) {
                logout();
            } else if (error.status == 404) {
                logout();
            }
        }
    }

    const getUserType = () => {
        // Returneaza ce fel de user este pentru a putea face
        // redirectari sau alte actiuni

    }

    return (
        <UserContext.Provider value={{ user, fetchUserProfile, type, getUserType }}>
            {children}
        </UserContext.Provider>
    );
}; 