
 Biocompute logo and title image here
# BioCompute: A Platform for Bioinformatics Analysis Workflow
## Introduction
BioCompute is a platform designed to facilitate the documentation and communication of bioinformatics analysis workflows. Following the IEEE 2791-2020 standard, BioCompute aims to ease communication burdens between research centers, organizations, and industries by providing a standardized, human- and machine-readable format for BioCompute Objects (BCOs).

## Key Features
- **Standardized Documentation**: Adopts the IEEE 2791-2020 standard for bioinformatics analyses.
- **User-Friendly Interface**: Build BioCompute Objects through an intuitive web portal.
- **Extensible**: Supports integration with various bioinformatics tools and databases.
- **Community-Driven**: Open-source and welcoming contributions from the community.

## Quickstart Guide

Follow these steps to get started with BioCompute:

1. Clone the Repository:
   
`git clone https://github.com/biocompute/bcodb.git
cd bcodb`


3. Set Up the Environment:

Ensure you have Python and Node.js installed.

Install dependencies:

`pip install -r requirements.txt
npm install`

4. Run the Server:

`cd server
python manage.py runserver`

5. Run the Client:

`cd client
npm start`

Access the Portal:
Open your web browser and navigate to **'http://localhost:3000'**.

## Architecture

BioCompute consists of two main components:

- **BCO Portal Server (UserDB)**:

Located in the **[`SERVER`](server/README.md)** directory.
Built with Django (Python) and uses SQLite3 for the database.

- **BCO Portal Client (Portal)**:

Located in the **[`CLIENT`](client/README.md)** directory.
Built with React and Redux ToolKit.

## Workflow Diagram
![gitflow diagram drawio](https://github.com/biocompute-objects/portal_userdb/assets/56750374/90128e93-9e5a-4611-9621-204fc8c73774)

## Installation
### Local Deployment for Development
 
Clone the Repository:

`git clone https://github.com/biocompute/bcodb.git
cd bcodb`

Install Dependencies:

`pip install -r requirements.txt
npm install
`

Run the Applications:

`cd server
python manage.py runserver
cd ../client
npm start`

Follow the detailed instructions in our [Local deployment Guide](docs/localDeployment.md)
### Production Deployment
Follow the detailed instructions in our [Production deployment Guide](docs/productionDeployment.md).

### Docker Deployment
Our [Docker deployment Guide](docs/dockerDeployment.md) is currently a work in progress. Stay tuned for updates.

## Contributing
We welcome contributions from the community! To contribute:

Fork the repository on GitHub.
Create a feature branch.
Commit your changes.
Submit a pull request.
Please refer to our [Contributing Guide]() for more details.

## FAQ and Troubleshooting
Find solutions to common issues in our [FAQ and trouble shooting Guide](docs/faq.md).

## License
BioCompute is licensed under the Apache 2.0 License. See the [LICENSE]() file for more details.

## Acknowledgements
We thank all our contributors and the wider community for their support.
