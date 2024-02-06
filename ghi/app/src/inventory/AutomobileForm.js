import React, { useEffect, useState } from 'react';

function AutomobileForm() {
    const [models, setModels] = useState([])

    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
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
        const url = 'http://localhost:8100/api/models/'
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setModels(data.models)
            } else {
                console.error('Failed to fetch models:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error fetching models', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const newAutomobile = await response.json();

                setFormData({
                    color: '',
                    year: '',
                    vin: '',
                    model_id: '',
                })
            } else {
                console.error('Server responded with an error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error parsing JSON response:', error);
        }
    }

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new automobile</h1>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleFormChange} placeholder="Color" required type="text" id="color" className="form-control"
                                name="color" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.year} onChange={handleFormChange} placeholder="YYYY" required type="number" min="1900" max="2100" id="year"
                                className="form-control" name="year" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.vin} onChange={handleFormChange} placeholder="Vin" required type="text" id="vin"
                                className="form-control" name="vin" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.model_id} onChange={handleFormChange} required id="model_id" className="form-select" name="model_id">
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
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

export default AutomobileForm
