"use client"

import { useParams } from "next/navigation"


export default function VerifyOtpPage(){
    const params = useParams<{id: string}>();


    return (
        <div>
            I am verify.
            <p>
                {`The id is ${params.id}`}
            </p>
        </div>
    )
}