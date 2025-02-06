@echo off
echo Starting the application...

:: Go to /form directory
cd form

:: Start the local server in the browser
start http://localhost:8080

:: Start the application
npm install
npm run dev

cd ..
