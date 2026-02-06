@echo off
echo Configurando Git...
git init
git add .
git commit -m "feat: Complete frontend v1.0 - All pages and components"
git remote add origin https://github.com/JoseSebaLM/paolarioseco.git
echo Subiendo a GitHub...
git push -u origin main
echo Listo! Revisa https://github.com/JoseSebaLM/paolarioseco
pause
