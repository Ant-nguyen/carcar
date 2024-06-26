import { useEffect, useState } from "react";

function AppointmentList() {
    const [appointments, setAppointments] = useState([])
    const [automobiles, setAutomobiles] = useState([])

    const fetchAppointments = async () => {
        let url = "http://localhost:8080/api/appointments/"
        try {
            let response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setAppointments(data.appointments)
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    const fetchAutomobiles = async () => {
        let url = "	http://localhost:8100/api/automobiles/"
        try {
            let response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setAutomobiles(data.autos)
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    useEffect(() => { fetchAppointments(); fetchAutomobiles() }, [])

    const handleCancel = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchConfig = {
            method: "put"
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                fetchAppointments()
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    const handleFinish = async (id) => {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`
        const fetchConfig = {
            method: "put"
        }
        try {
            const response = await fetch(url, fetchConfig)
            if (response.ok) {
                fetchAppointments()
            } else {
                console.error('Error:', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error', error.message)
        }
    }

    const vips = automobiles.filter(automobile => automobile.sold === true).map(automobile => automobile.vin)

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
                        <th>Is VIP?</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.filter(appointment => appointment.status === "created").map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.customer}</td>
                                <td>{appointment.vin}</td>
                                <td>{appointment.date_time}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.status}</td>
                                <td>{vips.includes(appointment.vin) ? 'Yes' : 'No'}</td>
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
