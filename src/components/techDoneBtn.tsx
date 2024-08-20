"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

function TechDoneBtn(id: any) {
    const router = useRouter();
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/issueStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    status: "VERIFY",
                }),
            });
            if (response.ok) {
                toast.success("Issue resolved successfully");
                router.push("/issues/verify");
            } else {
                toast.error("Failed to resolve issue");
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <button onClick={handleSubmit} className="p-1 px-2 rounded bg-white text-primary font-semibold hover:scale-95 duration-200">Confirm</button>
    </div>
  )
}

export default TechDoneBtn