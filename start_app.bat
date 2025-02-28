@echo off
chcp 65001 >nul
echo Starting the application...

:: Go to /application directory
cd application

:: Install the dependencies and start the application (runs in a separate command window)
start /min cmd /k "npm install && npm run dev"

:: Start a new minimized command window to handle the timeout and open localhost
start /min cmd /k "timeout /t 10 /nobreak >nul && start http://localhost:1000 && exit"

timeout /t 1 /nobreak >nul

:: Show a single-line loading bar animation
setlocal enabledelayedexpansion
set "bar="
set "spaces=                    "

echo.
<nul set /p "=Loading: [                    ] 0%%"

for /L %%i in (2,2,20) do (
    ping -n 2 127.0.0.1 >nul
    set "bar=!bar!■■"
    set /a percent=%%i * 5
    <nul set /p "=[GLoading: [!bar!!spaces:~%%i!] !percent!%%"
)

endLocal

echo.
echo.

echo Application started successfully!

:: Countdown before closing
echo.
<nul set /p "=This window will close in 5 seconds..."

for /L %%i in (4,-1,0) do (
    ping -n 2 127.0.0.1 >nul
    <nul set /p "=[GThis window will close in %%i seconds..."
)

:: 1 second delay before closing
timeout /t 2 /nobreak >nul

echo.
exit