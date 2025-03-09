@echo off
cd project
git clone https://github.com/TheOnlyRich/Scratch-Gallery.git
cd ..
robocopy data project\Scratch-Gallery page_all.json
cd project\Scratch-Gallery
git add page_all.json
git commit -m "Updated page_all.json with Node.js script"
git push origin main
pause