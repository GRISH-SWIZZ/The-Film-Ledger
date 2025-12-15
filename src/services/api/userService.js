import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const userService = {
    login: async (firebaseUser) => {
        const res = await axios.post(`${BASE_URL}/users/login`, {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
        });
        return res.data;
    }
};
