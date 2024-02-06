import React, { useEffect, useState } from 'react';

function TechnicianForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    const handleFormChange = (event) => {
        const inputName = event.target.name
        const value = event.target.value
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                setFormData({
                    first_name: '',
                    last_name: '',
                    employee_id: '',
                })

            } else {
                console.error('Server responded with an error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error parsing JSON response:', error)
        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={formData.first_name} onChange={handleFormChange} placeholder="First Name" required type="text" id="first_name" className="form-control"
                                name="first_name" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.last_name} onChange={handleFormChange} placeholder="Last Name" required type="text" id="last_name" className="form-control"
                                name="last_name" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.employee_id} onChange={handleFormChange} placeholder="Employee ID" required type="text" id="employee_id" className="form-control"
                                name="employee_id" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm
