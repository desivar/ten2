# Tennis API

## Project Description
This project is a robust RESTful API designed to manage tennis players and tournaments. Built with Node.js, Express, and MongoDB, it provides a backend solution for handling player statistics, tournament details, and related operations. The API is fully documented using Swagger UI for easy understanding and interaction.

## Features
* **Player Management:** Create, retrieve, update, and delete tennis player profiles.
* **Tournament Management:** Create, retrieve, update, and delete tournament details.
* **MongoDB Integration:** Persistent data storage using a NoSQL database.
* **RESTful Endpoints:** Standardized API endpoints for various operations.
* **API Documentation:** Interactive documentation available via Swagger UI.

## Technologies Used
* Node.js
* Express.js
* MongoDB (with Mongoose ODM)
* Swagger-Autogen & Swagger UI Express (for API documentation)

## Project Setup and Installation

### Prerequisites
* Node.js (LTS version recommended)
* MongoDB (running locally or a cloud instance like MongoDB Atlas)
* npm (Node Package Manager)

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [LINK_TO_YOUR_GITHUB_REPO_HERE]
    cd tennis-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up MongoDB:**
    Ensure your MongoDB instance is running. The application is configured to connect to `mongodb://localhost:27017/tennis` by default. You can change this in `src/config/database.js` if your MongoDB is hosted elsewhere.

4.  **Generate Swagger Documentation and Start the Server:**
    To generate the API documentation and start the server, run:
    ```bash
    node swagger-autogen.js
    ```
    This command will:
    * Generate `swagger-output.json` in your project root.
    * Start the Express server on `http://localhost:5500`.

## API Documentation (Swagger UI)

Once the server is running, you can access the interactive API documentation at:
`http://localhost:5500/api-docs`

This interface allows you to explore all available endpoints, understand their parameters, and even send test requests directly from your browser.

## API Endpoints (Example)
All API endpoints are prefixed with `/api`.

**Players:**
* `POST /api/players` - Create a new player.
* `GET /api/players` - Retrieve all players.
* `PUT /api/players/{id}` - Update a player by ID.
* `DELETE /api/players/{id}` - Delete a player by ID.

**Tournaments:**
* `POST /api/tournaments` - Create a new tournament.
* `GET /api/tournaments` - Retrieve all tournaments.
* `PUT /api/tournaments/{id}` - Update a tournament by ID.
* `DELETE /api/tournaments/{id}` - Delete a tournament by ID.

## Future Enhancements
* **Authentication & Authorization:** Implement user authentication (e.g., JWT) and role-based authorization for secure access to API endpoints.
* More comprehensive error handling.
* Pagination and filtering for large datasets.
* Unit and integration testing.

## Project Visual

![Project Screenshot Placeholder](https://github.com/desivar/ten2/blob/main/assets/apiplayers.png)



## Links

* **Live Demo (on Render):** [LINK_TO_YOUR_RENDER_DEMO_HERE]
    *(**Instructions**: Once you deploy your project to Render, paste the live URL here.)*
* **GitHub Repository (Source Code):** [LINK_TO_YOUR_GITHUB_REPO_HERE]
    *(**Instructions**: Replace this with the actual URL to your GitHub repository.)*

---


