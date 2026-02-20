import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

// Attaching access token to req body
api.interceptors.request.use((config) => {
    if(typeof window !== "undefined"){
        const token = localStorage.getItem("accessToken");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
})

// Auto refresh logic
api.interceptors.response.use(
    (response) => {
        return response
    },

    async(error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const res = await axios.post(
                    `${BASE_URL}/user/refresh-token`, 
                    {}, 
                    {withCredentials: true}
                )

                const newAccessToken = res.data.accessToken;
                if(typeof window !== "undefined"){
                    localStorage.setItem("accessToken", newAccessToken);
                }

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(err){
                if(typeof window !== "undefined"){
                    localStorage.removeItem("accessToken");
                    window.location.href = "/sign-in";
                }
            }
        }

        return Promise.reject(error);
    }
)

export default api;