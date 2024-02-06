import { useEffect, useState } from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([])
    const fetchTechnicians = async () => {
        let url = "http://localhost:8080/api/technicians/"
        let response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => { fetchTechnicians() }, [])

    const handleDelete = async (id) => {
        const url = `http://localhost:8080/api/technicians/${id}/`
        const fetchConfig = {
            method: "delete"
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            fetchTechnicians()
        } else {
            console.error('Failed to delete technician:', response.status, response.statusText)
        }

    }
    return (
        <div className="offset-3 col-6">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(technician => {
                        return (
                            <tr key={technician.id}>
                                <td>{technician.first_name} {technician.last_name}</td>
                                <td>{technician.employee_id}</td>
                                <td><button onClick={() => handleDelete(technician.id)} className="btn btn-danger">Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default TechnicianList
