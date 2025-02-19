FROM node:20-alpine

# Install Python, build tools, and required packages
RUN apk add --no-cache python3 py3-pip gdal gdal-dev gcc musl-dev python3-dev geos-dev

# Create a virtual environment and install Python packages
RUN python3 -m venv /opt/venv && \
    . /opt/venv/bin/activate && \
    pip install --no-cache-dir geopandas numpy pandas Shapely

# Ensure the virtual environment is activated by default
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]