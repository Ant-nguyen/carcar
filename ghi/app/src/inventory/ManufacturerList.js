import React, { useEffect, useState } from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([])

    const fetchManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setManufacturers(data.manufacturers)
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error)
        }
    }

    useEffect(() => {
        fetchManufacturers()
    }, [])

    const handleDelete = async (id) => {
        const url = `http://localhost:8100/api/manufacturers/${id}/`
        const fetchConfig = {
            method: "delete"
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                fetchManufacturers()
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error)
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                            <td><button onClick={() => handleDelete(manufacturer.id)} className="btn btn-danger">Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ManufacturerList
