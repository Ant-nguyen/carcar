import { useEffect,useState } from "react";

function VehicleModelList(){
  const [VehicleModel,setVehicleModel] = useState([])
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
    const response = await fetch(url,fetchConfig)
    if (response.ok) {
      fetchVehicleModels()
    } else {console.error('Failed to delete manufacturer:', response.status, response.statusText)
  }

  }
  return(
    <div className="offset-3 col-6">
    <table className="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {VehicleModel.map(models => {
        return (
          <tr key={models.id}>
              <td>{models.name}</td>
              <td><button onClick={() => handleDelete(models.id)} className="btn btn-danger">Remove</button></td>
          </tr>
          )
      })}
    </tbody>
</table>
</div>

  )
}

export default VehicleModelList
