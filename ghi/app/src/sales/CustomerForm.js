import { useState } from "react";

function CustomerForm(){
  const [customerForm,setCustomerForm] = useState({
    first_name:"",
    last_name:"",
    address:"",
    phone_number:""
  })
  const hadleFormChange = (event)=>{
    let key = event.target.name
    let value = event.target.value
    setCustomerForm({...customerForm,[key]:value})
  }
  const handleFormSubmit = async(event)=>{
    event.preventDefault()
    let url = "http://localhost:8090/api/customers/"
    let fetchConfig = {
      method:"POST",
      body:JSON.stringify(customerForm),
      headers:{'Content-Type': 'application/json'}
    }
    let response = await fetch(url,fetchConfig)
    if (response.ok){
      setCustomerForm({
        first_name:"",
        last_name:"",
        address:"",
        phone_number:""
      })
    }
  }
  return(
    <div className="my-5 container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer</h1>
          <form onSubmit={handleFormSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input value={customerForm.first_name} onChange={hadleFormChange} placeholder="First name" required type="text" id="first_name" className="form-control"
                  name="first_name" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={customerForm.last_name} onChange={hadleFormChange} placeholder="Last name" required type="text" id="last_name" className="form-control"
                  name="last_name" />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={customerForm.address} onChange={hadleFormChange} placeholder="Address" required type="text" id="address" className="form-control"
                  name="address" />
              <label htmlFor="addresss">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input value={customerForm.phone_number} onChange={hadleFormChange} placeholder="Phone Number" required type="num" id="phone_number" className="form-control"
                  name="phone_number" />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CustomerForm
