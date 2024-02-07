import { useEffect,useState } from "react";

function AutomobileList(){
  const [automobiles, setAutomobiles] = useState([])
  const fetchAutomobiles = async() =>{
    let url = "	http://localhost:8100/api/automobiles/"
    let response = await fetch(url)
    if(response.ok){
      let data = await response.json()
      setAutomobiles(data.autos)
    }
  }
  
  useEffect(()=>{fetchAutomobiles()},[])

  const handleDelete = async(vin) =>{
    const url = `http://localhost:8100/api/automobiles/${vin}`
    const fetchConfig = {
      method: "delete"
    }
    try {
      const response = await fetch(url,fetchConfig)
      if (response.ok) {
        fetchAutomobiles()
      } else {
          console.error('Error:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error.message)
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map(automobile => {
              return (
                <tr key={automobile.id}>
                  <td>{automobile.vin}</td>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.sold ? "Sold":"Not sold"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
  )
}

export default AutomobileList
