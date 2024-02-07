import { useState,useEffect } from "react";

function SalesPersonList(){
  const [salesPeople,setSalesPeople] = useState([])

  const fetchPeople = async() =>{
    let url = 'http://localhost:8090/api/salespeople/'
    const response = await fetch(url)
    if(response.ok){
      const data = await response.json()
      setSalesPeople(data.salespeople)
    }
  }

  useEffect(()=>{fetchPeople()},[])


  return(
    <div className="offset-3 col-6">
      <h1>Salespeople</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {salesPeople.map(salePerson => {
            return (
              <tr key={salePerson.id}>
                  <td>{salePerson.first_name}</td>
                  <td>{salePerson.last_name}</td>
                  <td>{salePerson.employee_id}</td>
              </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default SalesPersonList
