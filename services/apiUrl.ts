const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const auth = {
    CONTACT_API: BASE_URL + "/contact/contact-us",
    UNIQUE_USERNAME_API: BASE_URL + "/user/unique-username",
    SIGNUP_API: BASE_URL + "/user/sign-up"
}