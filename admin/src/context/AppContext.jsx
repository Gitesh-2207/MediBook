import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    // ✅ Calculate age based on DOB
    const calculateAge = (dob) => {
        if (!dob) return "-";
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    // ✅ Values provided to all components
    const value = {
        calculateAge,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
