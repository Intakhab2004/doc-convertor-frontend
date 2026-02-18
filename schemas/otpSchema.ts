import { z } from "zod";

export const otpVerifySchema = z.object({
    otp: z.string()
                  .min(1, "OTP is required")
                  .length(6, "OTP must be of 6 digits")
})