import { useEffect, useState } from "react";

function AppointmentHistory() {
    const [appointments, setAppointments] = useState([])
    const [automobiles, setAutomobiles] = useState([])
    const [vin, setVin] = useState('')

    const fetchAppointments = async () => {
        let url = "http://localhost:8080/api/appointments/"
        let response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
    }

    const fetchAutomobiles = async () => {
        let url = "	http://localhost:8100/api/automobiles/"
        let response = await fetch(url)
        if (response.ok) {
            let data = await response.json()
            setAutomobiles(data.autos)
            console.log(data.autos)
        }
    }

    useEffect(() => {
        fetchAutomobiles()
        fetchAppointments()
    }, [])

    const handleVinChange = (event) => {
        const value = event.target.value
        setVin(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()


    }

    const filteredAppointments = vin.length > 0 ? appointments.filter(appointment => appointment.vin.startsWith(vin)) : appointments
    const vips = automobiles.filter(automobile => automobile.sold === true).map(automobile => automobile.vin)

    return (
        <div className="my-5 container">
            <form onSubmit={handleSubmit} id="create-technician-form">
                <div className="form-floating mb-3">
                    <input value={vin} onChange={handleVinChange} placeholder="Vin" required type="text" id="vin" className="form-control"
                        name="vin" />
                    <label htmlFor="vin">Vin</label>
                </div>
                <button className="btn btn-primary">Search</button>
            </form>
            <div className="offset-3 col-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Is VIP?</th>
                            <th>Customer</th>
                            <th>Date-Time</th>
                            <th>Reason</th>
                            <th>Technician</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map(appointment => {
                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{(vips.includes(appointment.vin) ? 'Yes' : 'No')}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{appointment.date_time}</td>
                                    <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppointmentHistory
