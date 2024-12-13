import React from 'react'
import { useEffect } from 'react'

const AddJobs = () => {

    useEffect(() => {
        fetch('http:localhost:3008/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": "Finance Manager",
                "location": "Gulshan, Dhaka",
                "jobType": "Part-Time",
                "category": "Finance",
                "applicationDeadline": "2024-12-20",
                "salaryRange": {
                    "min": 50000,
                    "max": 70000,
                    "currency": "bdt"
                },
                "description": "We are hiring a Finance Manager to oversee financial operations, budgeting, and reporting.",
                "company": "Local Inch Ltd",
                "requirements": ["QuickBooks", "SAP", "Excel", "SQL"],
                "responsibilities": ["Manage budgets", "Prepare financial reports", "Ensure regulatory compliance"],
                "status": "active",
                "hr_email": "finance.hr@securefinance.com",
                "hr_name": "Md. Alamgir",
                "company_logo": "https://i.ibb.co/T1XRmbX/linkedin.png"
            }),
        })
    }, [])
    return (
        <div>
            AddJobs
        </div>
    )
}

export default AddJobs
