# Zoni Server

The **Zoni Server** is a Node.js/Express application powering the backend for the **Zoni** mobile app. This project integrates with the [Square API](https://developer.squareup.com/docs) to fetch and manage catalog items, process orders, and more.

## Table of Contents

- [Zoni Server](#zoni-server)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
  - [Folder Structure](#folder-structure)
  - [API Endpoints](#api-endpoints)
    - [Catalog Routes](#catalog-routes)
  - [Development Notes](#development-notes)
    - [Square Integration](#square-integration)
    - [Error Handling](#error-handling)
  - [Future Features](#future-features)
  - [License](#license)

## Features

- **Express.js** backend configured with **CORS** and **JSON** body parsing.
- **Square API** integration for accessing catalog items, variations, etc.
- Organized folder structure for easier maintainability.
- Ready for expansion with additional routes (e.g., user authentication, events, etc.).

## Getting Started

### Prerequisites

- **Node.js** (v16 or later recommended)
- **npm** (installed with Node.js) or **Yarn**
- A [Square Developer Account](https://developer.squareup.com/) (for the API key).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/zoni-server.git
   cd zoni-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

### Environment Variables

Create a file named `.env` in the root of this project. You’ll need at least:

```makefile
SQUARE_SANDBOX_ACCESS_TOKEN=YOUR_SQUARE_SANDBOX_ACCESS_TOKEN
PORT=3000
```

- `SQUARE_SANDBOX_ACCESS_TOKEN`: Sandbox API key from the Square Developer Dashboard.
- `PORT`: The port number on which the server will listen (default is 3000).

Note: Ensure `.env` is not committed to your repository.

## Running the Server

To start the server, run:

```bash
npm start
```

This will launch the server and listen on the port specified in `.env` (or 3000 by default).

## Folder Structure

Below is the recommended structure if you followed the refactoring approach:

```
zoni-server
 ┣ src
 │  ┣ config
 │  │  ┗ squareClient.js          # Square client setup
 │  ┣ helpers
 │  │  ┗ parseSquareCatalog.js    # Helper for parsing Square catalog
 │  ┣ routes
 │  │  ┣ index.js                 # Main router that combines all route modules
 │  │  ┗ catalogRoutes.js         # /api/catalog routes
 │  ┣ app.js                      # Express app setup, middlewares
 │  ┗ index.js                    # Server entry point (listens for connections)
 ┣ .env
 ┣ .gitignore
 ┣ package.json
 ┗ README.md
```

## API Endpoints

### Catalog Routes

| Method | Endpoint      | Description                                              |
|--------|---------------|----------------------------------------------------------|
| GET    | /api/catalog  | Fetches all catalog items from Square, returns parsed JSON |

Example Response for `GET /api/catalog`:

```json
{
  "items": [
    {
      "itemId": "RAGXN5QJQCPMVQH5M2BRLMTT",
      "itemName": "Chilly Hoodie",
      "itemDescription": "Item description Number one",
      "variations": [
        {
          "variationId": "KQ3B3KNRZDFRKTHBHRQCHELF",
          "variationName": "S",
          "sku": null,
          "priceAmount": "3999",
          "priceCurrency": "USD"
        }
      ],
      "imageIds": ["4FREIDX4HHBTXN3N73MJQUHB"]
    }
  ]
}
```

Additional routes will be documented here as they are added.

## Development Notes

### Square Integration

- Uses the Square Node.js SDK.
- By default, the `squareClient` is set to `Environment.Sandbox`. Switch to `Environment.Production` once you’re ready for production.

### Error Handling

- Basic error handling is in place. Look for `try/catch` blocks in the route files.
- Customize error messages and logging as needed.

## Future Features

- User authentication and profiles
- Event scheduling endpoints
- Payment endpoints (Orders/Payments API)

## License

This project is licensed under the terms you choose (e.g., MIT). If no license is specified, consider adding one for open-source contributions or clarify that it’s a private project.

© 2025 [Your Name or Company]. All rights reserved.