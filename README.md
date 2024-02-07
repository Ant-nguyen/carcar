# CarCar

**Team:**
* Austin Hall - Service
* Anthony Nguyen - Sales

## Getting Started

**Requires Docker and Git**

1. Fork the repository here: https://gitlab.com/npcsloan/project-

2. Clone your forked directory to your local machine.
   `git clone https://gitlab.com/XXXXXXXnotThisLinkButYours

3. In your terminal `cd` to your forked directory. Build a docker volume and build the doceker containers. You should be on same level as the *docker-compose.yml* file.
```
docker volume create beta-data
docker-compose build
docker-compose up
```
* Docker has to be running prior to running the docker commands.

4.  Check to see if all your containers are running properly. The project should be viewable at:
   http://localhost:3000/

![img](https://s3.us-west-2.amazonaws.com/forge-production.galvanize.com/content/c04b6949bb5eb0b3c5e6d82eaff556f3.png)
## Design

CarCar is made up of three main microservices back-end and 1 react app front-end

**Back-end**
- *Inventory*
- *Sales*
- *Services*

![img](https://i.imgur.com/YL3MY5d.png)

## API Endpoints: For browser or Insomnia

### Inventory

#### `Manufacturers `

| Action | Method | URL
| ----------- | ----------- | ----------- |
|A. List manufacturers | GET | `http://localhost:8100/api/manufacturers/`
|B. Create a manufacturer | POST | `http://localhost:8100/api/manufacturers/ |`
|C. Get a specific manufacturer | GET | `http://localhost:8100/api/manufacturers/id/`
|D. Update a specific manufacturer | PUT | `http://localhost:8100/api/manufacturers/id/`
|E. Delete a specific manufacturer | DELETE | `http://localhost:8100/api/manufacturers/id/`

A. GET | `http://localhost:8100/api/manufacturers/`
JSON body response should look like:
```json
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

B. POST | `http://localhost:8100/api/manufacturers/ |`
D. PUT | `http://localhost:8100/api/manufacturers/id/`
JSON `POST` and `PUT` format should look like:
```json
{
  "name": "Chrysler"
}
```

POST and PUT response will look like a C see below...

C. GET | `http://localhost:8100/api/manufacturers/id/`
JSON response will look like:
```json
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```

#### `Vehicle Models`
| Action | Method | URL
| ----------- | ----------- | ----------- |
|A. List vehicle models | GET | `http://localhost:8100/api/models/`
|B. Create a vehicle model | POST | `http://localhost:8100/api/models/`
|C. Get a specific vehicle model | GET | `http://localhost:8100/api/models/id/`
|D. Update a specific vehicle model | PUT | `http://localhost:8100/api/models/id/`
|E. Delete a specific vehicle model | DELETE | `http://localhost:8100/api/models/id/`

A. GET | `http://localhost:8100/api/models/`
JSON body response should look like:
```json
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

B. POST | `http://localhost:8100/api/models/`
D. PUT | `http://localhost:8100/api/manufacturers/id/`
JSON `POST` and `PUT` format should look like:
```json
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

POST and PUT response will look like a C see below...

C. GET | `http://localhost:8100/api/models/id/`
JSON body response should look like:
```json
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

#### `Automobiles`
| Action | Method | URL
| ----------- | ----------- | ----------- |
|A. List automobiles | GET | `http://localhost:8100/api/automobiles/`
|B. Create an automobile | POST | `http://localhost:8100/api/automobiles/`
|C. Get a specific automobile | GET | `http://localhost:8100/api/automobiles/vin/`
|D. Update a specific automobile | PUT |` http://localhost:8100/api/automobiles/vin/`
|E. Delete a specific automobile | DELETE | `http://localhost:8100/api/automobiles/vin/`
> Note that the `vin` at the end are not  *integers* type like with usual `ID`
> This is a *string* value with numbers and letters.
> example: `http://localhost:8100/api/automobiles/1D3HA18N76J218808/`

A. GET | `http://localhost:8100/api/automobiles/`
JSON response should look like:
```json
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```

B. POST | `http://localhost:8100/api/models/`
JSON Body for POST should look like example below:
```json
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174"
}
```
> Note that each vin should be unique.

JSON response will look like an individual GET see **C**  below

C. GET | `http://localhost:8100/api/automobiles/vin/`
JSON response
```json
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    },
    "sold": false
  }
}
```

D. PUT |` http://localhost:8100/api/models/id/`
JSON Body for POST should look like example below:
```json
{
  "color": "red",
  "year": 2012
}
```
>Note that not all fields need to be listed, back-end can handle single field changes.

JSON response will look like an individual GET see **C**  above

### Sales
#### `Salesperson`
| Action | Method | URL
| ----------- | ----------- | ----------- |
|A. List salespeople | GET | `http://localhost:8090/api/salespeople/`
|B. Create a salesperson | POST | `http://localhost:8090/api/salespeople/`
|C. Delete a salesperson | DELETE | `http://localhost:8090/api/salespeople/id/`

A. GET | `http://localhost:8090/api/salespeople/`
JSON response will look like:
```json
{
	"salespeople": [
		{
			"id": 1,
			"first_name": "Mark",
			"last_name": "Norman",
			"employee_id": "MaNorman"
		}
	]
}
```
B. POST | `http://localhost:8090/api/salespeople/`
JSON body should be formatted similar to:
```json
{
	"first_name":"Ant",
	"last_name":"Nguy",
	"employee_id":"AntWin"
}
```
response will look like:
```json
{
	"id": 6,
	"first_name": "Tim",
	"last_name": "Nguy",
	"employee_id": "TimWin"
}
```

C. DELETE |`http://localhost:8090/api/salespeople/id/`
Will return a JSON response with true or false depending if something was deleted.

#### `Customer`
| Action | Method | URL
| ----------- | ----------- | ----------- |
|A. List customers | GET | `http://localhost:8090/api/customers/`
|B. Create a customer | POST | `http://localhost:8090/api/customers/`
|C. Delete a customer | DELETE | `http://localhost:8090/api/customers/id/`

A. GET | `http://localhost:8090/api/customers/`
JSON response will look like:
```json
{
	"customers": [
		{
			"id": 1,
			"first_name": "Tony",
			"last_name": "Soprano",
			"address": "14 Aspen Drive, Caldwell, New Jersey",
			"phone_number": "9175550157"
		}
	]
}
```

B. POST |`http://localhost:8090/api/customers/`
JSON Body should look like:
```json
{
	"first_name" : "Edie",
	"last_name":"Falco",
	"address":"14 Aspen Drive, Caldwell, New Jersey",
	"phone_number": "4561239874"
}
```
JSON response will look like:
```json
{
	"id": 6,
	"first_name": "Edie",
	"last_name": "Falco",
	"address": "14 Aspen Drive, Caldwell, New Jersey",
	"phone_number": "4561239874"
}
```

C. DELETE | `http://localhost:8090/api/customers/id/`
Will return a JSON response with true or false depending if something was deleted.

#### `Sales`
| Action | Method | URL
| ----------- | ----------- | ----------- |
|A. List sales | GET | `http://localhost:8090/api/sales/`
|B. Create a sale | POST `|http://localhost:8090/api/sales/`
|C. Delete a sale | DELETE | `http://localhost:8090/api/sales/id/`

A. GET | `http://localhost:8090/api/sales/`
JSON response will look like:
```json
{
	"sales": [
		{
			"id": 13,
			"automobile": {
				"id": 1,
				"vin": "JH4DB1541NS001519",
				"sold": true
			},
			"salesperson": {
				"id": 2,
				"first_name": "Ant",
				"last_name": "Nguy",
				"employee_id": "AntWin"
			},
			"customer": {
				"id": 4,
				"first_name": "Tony JR",
				"last_name": "Soprano",
				"address": "14 Aspen Drive, Caldwell, New Jersey",
				"phone_number": "9177854568"
			},
			"price": 123456
		}
	]
}
```

B. POST `|http://localhost:8090/api/sales/`
JSON body should look like:
```json
{
	"automobile":"JH4DB1541NS001520",
	"salesperson":2,
	"customer":1,
	"price":30000
}
```
response will look like:
```json
{
	"id": 7,
	"automobile": {
		"id": 2,
		"vin": "JH4DB1541NS001520",
		"sold": false
	},
	"salesperson": {
		"id": 2,
		"first_name": "Ant",
		"last_name": "Nguy",
		"employee_id": "AntWin"
	},
	"customer": {
		"id": 1,
		"first_name": "Tony",
		"last_name": "Soprano",
		"address": "14 Aspen Drive, Caldwell, New Jersey",
		"phone_number": "9175550157"
	},
	"price": 30000
}
```

C. DELETE | `http://localhost:8090/api/sales/id/`
Will return a JSON response with true or false depending if something was deleted.
### Services


## Service microservice

<details><summary>Service diagram</summary>
![img](https://i.imgur.com/AuSpEeU.png)
</details>

## Sales microservice
<details><summary>Sales diagram</summary>
![img](https://i.imgur.com/AvRn58b.png)
</details>

