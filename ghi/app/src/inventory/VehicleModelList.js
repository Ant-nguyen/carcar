import { useEffect,useState } from "react";

function VehicleModelList() {
  const [vehicleModels, setVehicleModel] = useState([])

  const fetchVehicleModels = async() =>{
    let url = "http://localhost:8100/api/models/"
    let response = await fetch(url)
    if(response.ok){
      const data = await response.json()
      setVehicleModel(data.models)
    }
  }

  useEffect(()=>{fetchVehicleModels()},[])

  const handleDelete = async(id) =>{
    const url = `http://localhost:8100/api/models/${id}`
    const fetchConfig = {
      method: "delete"
    }
    try {
      const response = await fetch(url,fetchConfig)
      if (response.ok) {
        fetchVehicleModels()
      } else {
        console.error('Error:', response.status, response.statusText)
      }
    } catch (error) {
        console.error('Error', error)
      }
  }
  return(
    <div className="offset-3 col-6">
    <table className="table table-striped">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Manufacturer</th>
      </tr>
    </thead>
    <tbody>
      {vehicleModels.map(model => {
        return (
          <tr key={model.id}>
            <td>{model.picture_url ? (<img src={model.picture_url} alt={model.name} style={{ maxHeight: '100px' }} />) : null}</td>
              <td>{model.name}</td>
              <td>{model.manufacturer.name}</td>
              <td><button onClick={() => handleDelete(model.id)} className="btn btn-danger">Remove</button></td>
          </tr>
          )
      })}
    </tbody>
</table>
</div>

  )
}

export default VehicleModelList
