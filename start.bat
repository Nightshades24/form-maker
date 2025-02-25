@echo off
echo Starting the application...

:: Go to /builder directory
cd builder

:: Install the dependencies and start the application (runs in a separate command window)
start cmd /k "npm install && npm run dev"

:: Wait for server to start (adjust delay if necessary)
timeout /t 5 /nobreak >nul

:: Open the form builder in the default browser
start http://localhost:3000

:: Return to the original directory
cd ..

:: Go to /form directory
cd form

:: Install the dependencies and start the application (runs in a separate command window)
start cmd /k "npm install && npm run dev"

:: Wait for server to start (adjust delay if necessary)
timeout /t 10 /nobreak >nul

:: Open the form preview in the default browser
start http://localhost:8080

:: Return to the original directory
cd ..

echo Application started successfully!
exit
