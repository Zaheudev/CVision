import { createContext, useState, useEffect } from 'react';

import { getProfile } from '../utils/api';

import useAuth from '../hooks/useAuth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({name:"N/A"});
    const [type, setType] = useState(null);
    const { logout, getToken } = useAuth();

    // in functia asta extragem datele utilizatorului curent logat
    // si tipul acestuia (candidate/employer) si le salvam in context
    // functia asta o putem folosi mereu cand dorim sa actualizam datele utilizatorului
    // de exemplu dupa un update al profilului. Ca s paramentru a requestului 
    // folosim tokenul jwt salvat in localStorage in hookul useAuth la logare.
    // daca requestul esueaza cu 401 inseamna ca tokenul nu mai este valid
    // si atunci il delogam automat pe utilizator. Asta putem folosi si ca securitate
    const fetchUserProfile = async () => {
        try {
            const profile = await getProfile();
            console.log('Fetched user profile: ', profile);
            setUser(profile.user);
            setType(profile.userType);
        } catch (error) {
            console.error('Error fetching candidate profile:', error);
            if (error.status == 401) {
                logout();
            } else if (error.status == 404) {
                logout();
            }
        }
    }

    // Fetch user profile automatically when token exists
    useEffect(() => {
        const token = getToken();
        if (token && type === null) {
            fetchUserProfile();
        }
    }, [getToken]);

    // Reset type when user logs out
    useEffect(() => {
        const token = getToken();
        if (!token) {
            setType(null);
            setUser({name:"N/A"});
        }
    }, [getToken]);

    return (
        <UserContext.Provider value={{ user, fetchUserProfile, type }}>
            {children}
        </UserContext.Provider>
    );
}; 