# ShoppyGlobe-Server

A backend server created for ShoppyGlobe Frontend with the help of node, express & rest apis.

## Prerequisites

Before you start, ensure you have Node.js installed on your machine. If not, you can download and install it from [here](https://nodejs.org/).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/avi074/ShoppyGlobe-Server.git
```

2. Navigate into the project directory:

```bash
cd ShoppyGlobe-Server
```

3. Install dependencies:

```bash
npm install
```

## Usage

To start the server, start the mongodb local server / add your mongo atlas uri & then open the Folder in IDE & run

```bash
npm start
```

## Folder Structure

- `middlewares/` : Contains middleware functions for api handling.

- `models/` : Contains mongodb models for cart, product & user

- `controllers/` : Contains controller functions for models

- `routers/` : Contains multiple routers based on models

- `screenshots/` : Contains sample screenshots of api calls

- `server.js` : server config js file

## Screenshots

### MongoDb Compass before any api calls

> ![](/screenshots/1_compass%20at%20start.png)

### User Registrations

> ![](/screenshots/2_Adarsh%20superAdmin%20register.png) _SuperAdmin Registration_

> ![](/screenshots/3_avinash%20buyer1%20register.png) _Admin Registration_

> ![](/screenshots/4_prerna%20buyer2%20register.png) _Consumer 1 Registration_

> ![](/screenshots/5_Anu%20admin%20register.png) _Consumer 2 Registration_

### Compass after user registrations

> ![](/screenshots/6_compass%20after%20registrations%20.png) _MongoDB Compass test-db_

> ![](/screenshots/7_users%20after%20registration.png) _Users Collection_

> ![](/screenshots/8_carts%20after%20registration.png) _Carts Collection_

### Admin LogIn & Access Token

> ![](/screenshots/9_0_Anu%20admin%20login.png) _Admin LogIn Successful_

>  _Setting Access Token in the Headers_

> ![](/screenshots/9_1_Admin%20accessToken%20Headers.png)

### Adding Products with admin access

> ![](/screenshots/10_product%201%20.png) _Product 1_

> ![](/screenshots/11_product%202.png) _Product 2_

> ![](/screenshots/12_product%203.png) _Product 3_

> ![](/screenshots/13_0_products%20after%20adding.png) _Products Collection_

### GET Product(s)

> ![](/screenshots/13_1_fetch%20all%20products%20without%20authorization.png) _Fetch all products_

> ![](/screenshots/13_2_fetch%20one%20product%20by%20id.png) _Fetch a product by id_

### Consumer LogIn & Token

> ![](/screenshots/14_avinash%20buyer%20login.png) _Consumer 1 LogIn & Access token_

### Cart API Calls

> ![](/screenshots/15_avinash%20cart%20with%20accessToken%20in%20headers.png) _GET:  cart for consumer 1_

>![](/screenshots/16_avinash%20cart%20product%201.png) _POST: add product 1 in cart_ 

>![](/screenshots/17_avinash%20cart%20product%202.png)_POST: add product 3 in cart_ 

>![](/screenshots/18_carts%20after%20adding%20product.png) _Carts Collection after POST calls_

>![](/screenshots/19_carts%20after%20updating%20quantity.png) _PUT: updating quantity of product 3 in the cart_

>![](/screenshots/20_carts%20after%20deleting%20product%202.png) _DELETE: removing product 3 (last product in the array) from the cart by the productID_

>![](/screenshots/21_carts%20after%20deleting%20all%20products.png) _DELETE: removing all products from the cart_

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
