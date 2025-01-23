import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isNewUser, setIsNewUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;