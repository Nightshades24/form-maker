@echo off

set /p response=Convert the current form to json format? This will overwrite 'custom_form.json'. (Y/n)

:: If n or N or no or NO is entered, exit the script
if /i "%response%"=="n" goto no
if /i "%response%"=="N" goto no
if /i "%response%"=="no" goto no
if /i "%response%"=="NO" goto no
if /i "%response%"=="No" goto no
if /i "%response%"=="nO" goto no
goto yes

:no
echo Operation cancelled.
goto end

:yes
echo Converting form to JSON format...

node conversion/convert_to_json.js

echo Conversion complete. 'custom_form.json' has been overwritten.

:: Wait for 5 seconds
timeout /t 5

:end
