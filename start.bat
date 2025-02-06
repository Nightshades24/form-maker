@echo off
echo Starting the application...

:: Go to /form directory
cd form

:: Install the dependencies
::npm install

:: Start the application (runs in a separate command window)
start cmd /k "npm install && npm run dev"

:: Wait for server to start (adjust delay if necessary)
timeout /t 5 /nobreak >nul

:: Open the local server in the default browser
start http://localhost:8080

:: Return to the original directory
cd ..

echo Application started successfully!
exit
