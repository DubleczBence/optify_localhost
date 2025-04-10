<div id="top"> <!-- HEADER STÍLUS: KLASSZIKUS --> <div align="center">
OPTIFY_LOCALHOST
<em>Erősítsd a kérdőíveidet, fokozd a felhasználói élményt könnyedén</em>

<!-- JELVÉNYEK --> <img src="https://img.shields.io/github/license/DubleczBence/optify_localhost?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license"> <img src="https://img.shields.io/github/last-commit/DubleczBence/optify_localhost?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit"> <img src="https://img.shields.io/github/languages/top/DubleczBence/optify_localhost?style=flat&color=0080ff" alt="repo-top-language"> <img src="https://img.shields.io/github/languages/count/DubleczBence/optify_localhost?style=flat&color=0080ff" alt="repo-language-count">
<em>Fejlesztve a következő technológiákkal:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express"> <img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON"> <img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm"> <img src="https://img.shields.io/badge/Firebase-DD2C00.svg?style=flat&logo=Firebase&logoColor=white" alt="Firebase"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript"> <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React"> <br> <img src="https://img.shields.io/badge/MySQL-4479A1.svg?style=flat&logo=MySQL&logoColor=white" alt="MySQL"> <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker"> <img src="https://img.shields.io/badge/CSS-663399.svg?style=flat&logo=CSS&logoColor=white" alt="CSS"> <img src="https://img.shields.io/badge/datefns-770C56.svg?style=flat&logo=date-fns&logoColor=white" alt="datefns"> <img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=flat&logo=chartdotjs&logoColor=white" alt="Chart.js"> <img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest"> </div> <br>
Tartalomjegyzék
Áttekintés

Kezdeti lépések

Előfeltételek

Telepítés

Használat

Tesztelés

Funkciók

Áttekintés
Az optify_localhost egy hatékony fejlesztői eszköz, amely leegyszerűsíti a kérdőív alkalmazások létrehozását és kezelését, egy robusztus backend és egy interaktív frontend kombinációjával.

Miért az optify_localhost?

A projekt célja a kérdőív rendszerek gyors beüzemelésének támogatása és a felhasználói élmény fokozása. A legfontosabb funkciók közé tartozik:

🎛️ Helyi adatbázis környezet: Gyors beállítás minimális konfigurációval.

🚀 React alkalmazás struktúra: Átlátható architektúra a fejlesztéshez és telepítéshez.

📊 Valós idejű adatinterakció: Dinamikus megjelenítés, reszponzív elemekkel.

🔐 Felhasználókezelés: Egyszerű, biztonságos regisztráció és bejelentkezés.

🎨 Testreszabható felhasználói felület: Vizualitás a felhasználói igények szerint.

🔗 Robusztus API integráció: Hatékony adatkommunikáció frontend és backend között.

Funkciók
Komponens	Részletek
⚙️	Architektúra	<ul><li>Mikroszolgáltatás alapú felépítés</li><li>Frontend (React), Backend (Node.js)</li><li>RESTful API kialakítás</li></ul>
🔩	Kódszabvány	<ul><li>ESLint a JavaScript ellenőrzésére</li><li>Prettier a formázáshoz</li><li>Konzisztens kódolási gyakorlat</li></ul>
🔌	Integrációk	<ul><li>Firebase az autentikációhoz</li><li>MySQL adatbázis kezeléshez</li><li>Chart.js és MUI vizualizációhoz</li></ul>
🧩	Modularitás	<ul><li>Frontend és backend külön mappában</li><li>Újrahasznosítható React komponensek</li><li>Moduláris backend route-ok</li></ul>
🧪	Tesztelés	<ul><li>Egységtesztek (Jest)</li><li>Integrációs tesztek (Supertest)</li><li>End-to-end tesztelés (Selenium WebDriver)</li></ul>
⚡️	Teljesítmény	<ul><li>React.memo optimalizálás</li><li>Hatékony MySQL lekérdezések</li><li>Késleltetett betöltés</li></ul>
🛡️	Biztonság	<ul><li>JWT alapú hitelesítés</li><li>express-validator bemenet ellenőrzéshez</li><li>Környezeti változók</li></ul>
📦	Függőségek	<ul><li>React, React Router, MUI (frontend)</li><li>Express, MySQL, bcrypt (backend)</li><li>Jest, Testing Library (tesztelés)</li></ul>
🚀	Skálázhatóság	<ul><li>Docker konténerizálás</li><li>Mikroszolgáltatásos kialakítás</li><li>Terheléselosztási lehetőségek</li></ul>
Kezdeti lépések
Előfeltételek
A projekt futtatásához szükséges:

Programozási nyelv: JavaScript

Csomagkezelő: npm

Konténer futtató: Docker (opcionális)

Telepítés
Építsd fel az optify_localhost projektet forráskódból:

Repository klónozása:

sh
Másolás
Szerkesztés
git clone https://github.com/DubleczBence/optify_localhost
Navigálás a projekt mappába:

sh
Másolás
Szerkesztés
cd optify_localhost
Függőségek telepítése:

Docker használatával:

sh
Másolás
Szerkesztés
docker build -t DubleczBence/optify_localhost .
npm használatával:

sh
Másolás
Szerkesztés
npm install
Használat
A projekt futtatása:

Docker használatával:

sh
Másolás
Szerkesztés
docker run -it {image_name}
npm használatával (külön backend indítása):

sh
Másolás
Szerkesztés
cd backend
node app.js
A frontend React alkalmazás külön repositoryban található, itt:
👉 optify - frontend repository

A projekt éles (webes) változata elérhető itt:
🌐 optify-survey.vercel.app

Tesztelés
Az optify_localhost a Jest keretrendszert használja. A tesztek futtatása:

npm használatával:

sh
Másolás
Szerkesztés
npm test
Docker használatával:

sh
Másolás
Szerkesztés
echo 'INSERT-TEST-COMMAND-HERE'
📄 Itt található a teljes dokumentációnk is Word formátumban:
👉 Dokumentáció letöltése (kérlek, adj meg egy linket, pl. Google Drive, ha szeretnéd, hogy ide kerüljön!)

<div align="left"><a href="#top">⬆ Vissza a tetejére</a></div>
