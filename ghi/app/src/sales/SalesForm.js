import { useState,useEffect } from "react";

function SalesForm(){

  const [salesform,setSalesForm]= useState({
    automobile:"",
    salesperson:"",
    customer:"",
    price:""
  })

  const [salespeople,setSalespeople] = useState([])
  const fetchSalespeople= async()=>{
    let personUrl = "http://localhost:8090/api/salespeople/"
    let response = await fetch(personUrl)
    if(response.ok){
      let data = await response.json()
      setSalespeople(data.salespeople)
    }
  }

  const [customers,setCustomers] = useState([])
  const fetchCustomer = async()=>{
    let customerUrl = "http://localhost:8090/api/customers/"
    let response = await fetch(customerUrl)
    if(response.ok){
      let data = await response.json()
      setCustomers(data.customers)
    }
  }

  const [automobiles,setAutomobiles] = useState([])
  const fetchAutomobiles = async()=>{
    let autoUrl = "http://localhost:8100/api/automobiles/"
    let response = await fetch(autoUrl)
    if(response.ok){
      let data = await response.json()
      let filtered = data.autos.filter((auto)=>auto.sold==false)
      setAutomobiles(filtered)
    }
  }

  const handleFormChange = (event)=>{
    let value = event.target.value
    let key = event.target.name
    setSalesForm({
      ...salesform,
      [key]:value
    })
  }
  const handleSubmit = async(event)=>{
    event.preventDefault()
    let salesURL = "http://localhost:8090/api/sales/"
    let salesFetchConfig = {
      method:"POST",
      body: JSON.stringify(salesform),
      headers: {'Content-Type': 'application/json'}
    }
    let response = await fetch(salesURL,salesFetchConfig)
    if(response.ok){
      let autoURL = `http://localhost:8100/api/automobiles/${salesform.automobile}/`
      let autoFetchConfig = {
        method:"PUT",
        body:JSON.stringify({sold:true}),
        headers: {'Content-Type': 'application/json'}
      }
      let autoResponse = await fetch(autoURL,autoFetchConfig)
      if(autoResponse.ok){
        fetchAutomobiles()
        setSalesForm({
          automobile:"",
          salesperson:"",
          customer:"",
          price:""
        })
      }
    }
  }

  useEffect(()=>{fetchAutomobiles();fetchCustomer();fetchSalespeople();},[])

  return(
  <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Record a new sale</h1>
        <form onSubmit={handleSubmit} id="create-sales-form">
        <div className="mb-3">
          <label htmlFor="automobile">Automobile VIN</label>
          <select onChange={handleFormChange} value={salesform.automobile} required id="automobile" name = "automobile" className="form-select">
          <option value="">Choose an automobile VIN</option>
          {automobiles.map(autos => {
          return (
            <option key= {autos.vin} value={autos.vin}>{autos.vin}</option>);})}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="automobile">Salesperson</label>
          <select onChange={handleFormChange} value={salesform.salesperson} required id="salesperson" name = "salesperson" className="form-select">
          <option value="">Choose a salesperson</option>
          {salespeople.map(person => {
          return (
            <option key= {person.employee_id} value={person.id}>{person.first_name} {person.last_name} - {person.employee_id}</option>);})}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="automobile">Customer</label>
          <select onChange={handleFormChange} value={salesform.customer} required id="customer" name = "customer" className="form-select">
          <option value="">Choose a salesperson</option>
          {customers.map(customer => {
          return (
            <option key= {customer.id} value={customer.id}>{customer.first_name} {customer.last_name} - {customer.phone_number}</option>);})}
          </select>
        </div>
        <div className="form-floating mb-3">
          <input value={salesform.price} onChange={handleFormChange} placeholder="Price" required type="number" id="price" className="form-control"
            name="price" />
          <label htmlFor="price">Price $</label>
      </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
  )
}
export default SalesForm
