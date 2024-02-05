import React, { useEffect, useState } from 'react';

function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState('')

    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = manufacturer

        const url = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                const newManufacturer = await response.json()

                setManufacturer('')
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
                    <h1>Add a manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={manufacturer} onChange={handleManufacturerChange} placeholder="manufacturer" required type="text" id="manufacturer" className="form-control"
                                name="manufacturer" />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm
