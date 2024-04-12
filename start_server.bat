@echo off
cd server
echo Starting Minecraft Server...

for %%i in (*.jar) do (
    echo Found %%i
    java -Xmx1024M -Xms1024M -jar "%%i" nogui
    exit /b
)
