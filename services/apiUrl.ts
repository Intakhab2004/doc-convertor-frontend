import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

// Attaching access token to req body
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
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
                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(err){
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
)

export default api;