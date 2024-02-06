import { useState } from "react";

function SalespersonForm(){
  const [salesForm,setSalesForm] = useState({
    first_name:"",
    last_name:"",
    employee_id:"",
  })

  const hadleFormChange = (event)=>{
    let value = event.target.value
    let key = event.target.name
    setSalesForm({...salesForm,[key]:value})
  }

  const handleFormSubmit = async(event) =>{
    event.preventDefault()
    let url = "http://localhost:8090/api/salespeople/"
    let fetchConfig = {
      method: "POST",
      body: JSON.stringify(salesForm),
      headers: {'Content-Type': 'application/json'}
    }
    try{
      let response = await fetch(url,fetchConfig)
      if(response.ok){
        let data = await response.json()
        console.log(data)
        setSalesForm({
          first_name:"",
          last_name:"",
          employee_id:"",
        })
      }
    }catch(error){
      console.error('Error parsing JSON response:', error)
    }

  }

  return(
    <div className="my-5 container">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add a Salesperson</h1>
            <form onSubmit={handleFormSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                    <input value={salesForm.first_name} onChange={hadleFormChange} placeholder="First name" required type="text" id="first_name" className="form-control"
                        name="first_name" />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={salesForm.last_name} onChange={hadleFormChange} placeholder="Last name" required type="text" id="last_name" className="form-control"
                        name="last_name" />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={salesForm.employee_id} onChange={hadleFormChange} placeholder="Employee ID" required type="text" id="employee_id" className="form-control"
                        name="employee_id" />
                    <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</div>
  )
}
export default SalespersonForm
