import { useState,useEffect } from "react";

function SalesHistory(){
  let [sales,setSales] = useState([])
  let [showSales,setShowSales]= useState([])
  let [salesPeople,setSalespeople] = useState([])

  let handleChange = (event)=>{
    let value = event.target.value
    let filters = sales.filter((sale)=>sale.salesperson.id==value)
    setShowSales(filters)
  }


  let fetchPeople = async() =>{
    let url = "http://localhost:8090/api/salespeople/"
    let response = await fetch(url)
    if(response.ok){
      let data = await response.json()
      setSalespeople(data.salespeople)
    }
  }
  let fetchSales = async() =>{
    let url = "http://localhost:8090/api/sales/"
    let response = await fetch(url)
    if(response.ok){
      let data = await response.json()
      setSales(data.sales)
    }
  }

  useEffect(()=>{fetchPeople();fetchSales();},[])

  return(
  <div className="offset-2 col-8">
    <h1>Salesperson History</h1>
    <div className="mb-3">
      <label htmlFor="automobile">Salesperson</label>
      <select onChange={handleChange} required id="salesperson" name = "salesperson" className="form-select">
      <option value="">Choose a salesperson</option>
      {salesPeople.map(person => {
      return (
        <option key= {person.employee_id} value={person.id}>{person.first_name} {person.last_name} - {person.employee_id}</option>);})}
      </select>
    </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {showSales.map(sale => {
            return (
              <tr key={sale.id}>
                  <td>{sale.salesperson.employee_id}</td>
                  <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                  <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                  <td>{sale.automobile.vin}</td>
                  <td>{sale.price}</td>
              </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default SalesHistory
