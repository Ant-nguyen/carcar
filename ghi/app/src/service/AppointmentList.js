import { useEffect, useState } from "react";

function AppointmentList() {
    const [appointments, setAppointments] = useState([])
    const fetchAppointments = async () => {
        let url = "http://localhost:8080/api/appointments/"
        let response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
    }

    useEffect(() => { fetchAppointments() }, [])

    const handleCancel = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchConfig = {
            method: "put"
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            fetchAppointments()
        } else {
            console.error('Failed to cancel appointment:', response.status, response.statusText)
        }
    }

    const handleFinish = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`
        const fetchConfig = {
            method: "put"
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            fetchAppointments()
        } else {
            console.error('Failed to finish appointment:', response.status, response.statusText)
        }

    }
    return (
        <div className="offset-3 col-6">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Date-Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.filter(appointment => appointment.status === "created").map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.customer}</td>
                                <td>{appointment.vin}</td>
                                <td>{appointment.date_time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                                <td><button onClick={() => handleCancel(appointment.id)} className="btn btn-danger">Cancel</button></td>
                                <td><button onClick={() => handleFinish(appointment.id)} className="btn btn-success">Finish</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default AppointmentList
