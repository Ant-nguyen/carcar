import { useEffect,useState } from "react";

function AutomobileList(){
  const [automobiles, setAutomobiles] = useState([])
  const fetchAutomobiles = async() =>{
    let url = "	http://localhost:8100/api/automobiles/"
    let response = await fetch(url)
    if(response.ok){
      let data = await response.json()
      setAutomobiles(data.autos)
      console.log(data.autos)
    }
  }
  useEffect(()=>{fetchAutomobiles()},[])

  const handleDelete = async(vin) =>{
    const url = `http://localhost:8100/api/automobiles/${vin}`
    const fetchConfig = {
      method: "delete"
    }
    const response = await fetch(url,fetchConfig)
    if (response.ok) {
      fetchAutomobiles()
    } else {console.error('Failed to delete Automobile:', response.status, response.statusText)
  }
  }
  return (
    <div className="offset-3 col-6">
    <table className="table table-striped">
    <thead>
      <tr>
        <th>VIN</th>
        <th>Color</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      {automobiles.map(automobile => {
        return (
          <tr key={automobile.id}>
              <td>{automobile.vin}</td>
              <td>{automobile.color}</td>
              <td>{automobile.year}</td>
              <td><button onClick={() => handleDelete(automobile.vin)} className="btn btn-danger">Remove</button></td>
          </tr>
          )
      })}
    </tbody>
    </table>
    </div>
  )
}

export default AutomobileList
