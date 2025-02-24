# ClearWay

A web application for visualizing and analyzing corridor widths for emergency service vehicles (IZS - Integrated Rescue System).

## Overview

ClearWay helps emergency services assess route accessibility by visualizing corridor widths on a map. It supports different types of emergency vehicles including:

## Features

- Interactive map visualization using OpenStreetMap
- Vehicle width presets for different emergency services
- Min/Max corridor width toggle
- CSV file upload for custom data
- Persistent settings across page refreshes
- Mobile-responsive design
- Real-time corridor width visualization
- Dataset selection and management

## Technology Stack

- Frontend: React with TypeScript
- Map: Leaflet with React-Leaflet
- State Management: React Query
- Styling: CSS-in-JS with inline styles
- Storage: LocalStorage for persistence

## Usage

1. Select an emergency service type (Fire, Ambulance, or Police)
2. Choose a specific vehicle type with its corresponding width
3. View the corridor width visualization on the map
4. Toggle between minimum and maximum corridor widths
5. Upload custom CSV data if needed
6. Select different datasets for analysis

## Data Persistence

The application maintains state across page refreshes, storing:
- Selected vehicle type and width
- Min/Max toggle state
- Selected dataset
- Custom user preferences

## Docker Setup

The entire application is containerized using Docker, making it easy to run in any environment.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Clone the repository:

```bash
git clone https://github.com/VandlJ/ClearWay.git
cd ClearWay
```

2. Build and start the containers:

```bash
docker-compose up --build
```

This will:

- Build and start the frontend container (accessible at https://storagegrid.eu)
- Build and start the backend container
- Set up the necessary network between containers
- Mount the required volumes for development

### Container Structure
- Frontend Container:
    - Node.js 20 Alpine-based
    - Runs Vite development server
    - Hot-reloading enabled
    - Volume mounted for development
- Backend Container:
    - Node.js 20 Alpine-based
    - Python environment for data processing
    - Required Python packages pre-installed
    - Shared volume with preprocessing directory
