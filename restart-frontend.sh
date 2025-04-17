#!/bin/bash
# Script to fix the Next.js build issue and restart the frontend service

# Replace VM_USER with your actual username
VM_USER=${1:-"root"}
VM_IP="147.228.173.116"

# Check if username was provided
if [ "$#" -eq 0 ]; then
  echo "Warning: No username provided, using 'root' as default."
  echo "Usage: ./restart-frontend.sh <username>"
  echo "Continuing with default user 'root'..."
fi

echo "=== Starting ClearWay Frontend Fix ==="
echo "Using user: $VM_USER on VM: $VM_IP"

# Build and run script on remote server
ssh $VM_USER@$VM_IP << 'EOF'
echo "Connected to VM, starting repair process..."

cd ~/deployments/latest/frontend

# Check and fix package.json if needed
if ! grep -q "\"build\":" package.json; then
  echo "Adding build script to package.json..."
  # Use a temporary file to avoid issues with inline editing
  cat package.json | sed 's/"scripts": {/"scripts": {\n    "build": "next build",/' > package.json.tmp
  mv package.json.tmp package.json
fi

# Install dependencies and build the Next.js app
echo "Installing dependencies (this may take a few minutes)..."
npm install

echo "Building Next.js application..."
npm run build

# Update the PM2 ecosystem config
cd ~/deployments
echo "Updating PM2 configuration..."
cat > ecosystem.config.js << 'EOL'
module.exports = {
  apps: [
    {
      name: 'clearway-backend',
      script: 'backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      },
      watch: false,
      instances: 1,
      autorestart: true,
      max_restarts: 10
    },
    {
      name: 'clearway-frontend',
      cwd: 'frontend',
      script: 'node',
      args: '.next/server/app/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      },
      watch: false,
      instances: 1,
      autorestart: true,
      max_restarts: 10
    }
  ]
};
EOL

# Restart the frontend service
echo "Restarting frontend service..."
pm2 delete clearway-frontend || true
cd ~/deployments/latest
pm2 start ../ecosystem.config.js --only clearway-frontend
pm2 save

# Wait for the service to start
echo "Waiting for service to start..."
sleep 5

# Verify the service is running
echo "Checking service status:"
pm2 list | grep frontend
echo "Checking port 3000:"
netstat -tulpn | grep :3000 || echo "WARNING: No process found listening on port 3000"

# Check the logs for errors
echo "Last 5 lines of frontend logs:"
tail -n 5 ~/.pm2/logs/clearway-frontend-error.log || echo "No error log found"
tail -n 5 ~/.pm2/logs/clearway-frontend-out.log || echo "No output log found"

echo "Repair process complete!"
EOF

echo "=== Fix script completed ==="
echo "To access your application, open http://$VM_IP:3000 in your browser"