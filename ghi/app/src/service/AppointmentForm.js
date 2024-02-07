import React, { useEffect, useState } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])

    const [formData, setFormData] = useState({
        vin: '',
        customer: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
    })

    const handleFormChange = (event) => {
        const inputName = event.target.name
        const value = event.target.value
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/'
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setTechnicians(data.technicians)
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://localhost:8080/api/appointments/'
        const combinedDateTime = new Date(`${formData.date}T${formData.time}`)
        formData["date_time"] = combinedDateTime.toISOString()
        delete formData.date
        delete formData.time

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
                    vin: '',
                    customer: '',
                    date: '',
                    time: '',
                    technician: '',
                    reason: '',
                })

            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={formData.vin} onChange={handleFormChange} placeholder="Vin" required type="text" id="vin" className="form-control"
                                name="vin" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.customer} onChange={handleFormChange} placeholder="Customer" required type="text" id="customer" className="form-control"
                                name="customer" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.date} onChange={handleFormChange} placeholder="Date" required type="date" id="date" className="form-control"
                                name="date" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.time} onChange={handleFormChange} placeholder="Time" required type="time" id="time" className="form-control"
                                name="time" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.reason} onChange={handleFormChange} placeholder="Reason" required type="text" id="reason" className="form-control"
                                name="reason" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.technician} onChange={handleFormChange} required id="technician" className="form-select" name="technician">
                                <option value="">Choose a technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.first_name} {technician.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentForm
