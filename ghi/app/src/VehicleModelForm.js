import { useEffect, useState } from "react"

function VehicleModelForm(){
	const [modelForm,setModelForm] = useState({
		name:"",
		picture_url:"",
		manufacturer_id:""
	})

	function formChange(event){
		let key = event.target.name
		let value = event.target.value
		setModelForm({...modelForm,
		[key]:value})
	}


	let [manufacturers, setManufacturers] = useState([])

	let fetchManufacturer = async() =>{
		let apiurl = 'http://localhost:8100/api/manufacturers/'
		let response = await fetch(apiurl)
		if(response.ok){
			let data = await response.json()
			setManufacturers(data.manufacturers)
		}
	}

	useEffect(() =>{fetchManufacturer()},[])


	let handleSubmit = async(event)=>{
		event.preventDefault()
		const data = {...modelForm}
		let url = 'http://localhost:8100/api/models/'
		const fetchConfig={
			method: "POST",
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		}
		let response = await fetch(url,fetchConfig)
		if(response.ok){
			const LeData = await response.json();
			console.log(LeData)
			setModelForm({
				name:"",
				picture_url:"",
				manufacturer_id:""
			})
		}
	}


	return(
		<div className="row">
		<div className="offset-3 col-6">
		<div className="shadow p-4 mt-4">
				<h1>Create a new Vehicle Model</h1>
				<form onSubmit={handleSubmit} id="create-vehicle-model-form">
				<div className="form-floating mb-3">
						<input onChange={formChange} value={modelForm.name} placeholder="Name" required type="text" name = "name" id="name" className="form-control"/>
						<label htmlFor="name">Name</label>
				</div>
				<div className="form-floating mb-3">
						<input onChange={formChange} value={ modelForm.picture_url} placeholder="Picture" required type="text" name = "picture_url" id="picture_url" className="form-control"/>
						<label htmlFor="presentations">Picture</label>
				</div>
				<div className="mb-3">
						<select onChange={formChange} value={modelForm.manufacturer_id} required id="manufacturer_id" name = "manufacturer_id" className="form-select">
						<option value="">Choose a Manufacturer</option>
						{manufacturers.map(manufacturer => {
						return (
								<option key= {manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
						);
						})}
						</select>
				</div>
				<button className="btn btn-primary">Create</button>
				</form>
		</div>
		</div>
	</div>
	)
}

export default VehicleModelForm
