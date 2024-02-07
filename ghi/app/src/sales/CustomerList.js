import { useState,useEffect } from "react";

function CustomerList(){
  const [customers,setCustomers] = useState([])

  let fetchCustomer = async()=>{
    let url = "http://localhost:8090/api/customers/"
    let response = await fetch(url)
    if(response.ok){
      let data = await response.json()
      setCustomers(data.customers)
    }
  }

  useEffect(()=>{fetchCustomer()},[])

  return(
    <div className="offset-2 col-8">
      <h1>Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => {
            return (
              <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.address}</td>
              </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default CustomerList
