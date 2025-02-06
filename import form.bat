@echo off

set /p response=Convert 'custom_form.json' to local Formio form? This will overwrite the files in the 'form/' directory. (Y/n)

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

node conversion/convert_from_json.js

echo Conversion complete. Files in the 'form/' directory have been overwritten.

pause

:end
