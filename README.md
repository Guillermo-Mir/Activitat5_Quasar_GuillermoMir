# Projecte PokéManager (Quasar + Nuxt)

## Arquitectura del projecte

Aquest projecte està compost per dues entitats separades que es comuniquen mitjançant una API REST:

1. **Backend (Nuxt Server + Drizzle ORM)** - Proveeix la lògica de servidor i l'API a les carpetes `server/api/` i `server/routes/`.
   - Utilitza **Drizzle ORM** per gestionar les dades en una base de dades SQL.
   - Gestiona l'autenticació mitjançant **JSON Web Tokens (JWT)** per permetre l'accés segur tant des de l'aplicació web com des de dispositius mòbils.

2. **Frontend (Quasar Framework + Capacitor)** - Una aplicació multiplataforma (Web i Android) que consumeix l'API del backend.
   - Utilitza **Axios** amb un interceptor de seguretat que injecta automàticament el token `Bearer` emmagatzemat al `localStorage`.
   - La interfície compta amb components de **Quasar** (Notify, Loading, Dialog) per a una experiència d'usuari fluida i nativa.

---

## Endpoints del backend

| Endpoint          | Mètode | Descripció |
|-------------------|--------|------------|
| `/auth/login`     | POST   | Valida credencials i retorna un token JWT i les dades de l'usuari. |
| `/auth/register`  | POST   | Registra un usuari nou, l'emmagatzema i genera un token d'accés inicial. |
| `/api/pokemons`   | GET    | Retorna el llistat de Pokemons filtrats per l'ID de l'usuari autenticat. |
| `/api/pokemons`   | POST   | Crea un nou Pokemon vinculat permanentment a l'usuari actual. |
| `/api/pokemons?id=X`| PUT    | Modifica les dades d'un Pokemon existent pel seu ID (nom, tipus, gen). |
| `/api/pokemons?id=X`| DELETE | Elimina un Pokemon de la base de dades segons el seu ID. |

---

## Flux d’autenticació i dades

1. **Registre i Login**: L’usuari envia les seves dades a `/auth/register` o `/auth/login`. 
   - El backend valida la informació i genera un **Token JWT** signat.
   - El frontend rep aquest token, el desa al `localStorage` i el configura a les capçaleres d'Axios per a futures peticions.

2. **Accés a dades (Interceptor)**: Cada vegada que l'app de Quasar fa una petició a `/api/pokemons`:
   - L'interceptor d'Axios afegeix la capçalera `Authorization: Bearer <token>`.
   - El backend rep el token, el descodifica per identificar l'usuari i retorna només els Pokémon que li pertanyen.

3. **Protecció de rutes**: Si una petició retorna un error **401 (Unauthorized)** (per token caducat o inexistent), el frontend redirigeix automàticament l'usuari a la pàgina de login per seguretat.

4. **Logout**: Quan l’usuari prem el botó de sortida:
   - Es neteja el `localStorage` (s'elimina el token).
   - Es redirigeix l'usuari a la pantalla de Login, impedint qualsevol petició posterior a l'API.

---

## Posada en marxa

### Backend (Nuxt)
1. Instal·la les dependències: `npm install`.
2. Configura el fitxer `.env` amb la clau secreta per al JWT (`JWT_SECRET`).
3. Actualitza l'esquema de la base de dades: `npx drizzle-kit push`.
4. Arrenca el servidor: `npm run dev`.

### Frontend (Quasar)
1. Instal·la les dependències: `npm install`.
2. Configura l'IP del servidor a `src/boot/axios.js` per a la comunicació en xarxa local (mòbil).
3. Habilita els plugins `Notify`, `Loading` i `Dialog` a `quasar.config.js`.
4. Executa en mode desenvolupament (Web): `quasar dev`.
5. Executa en mode Android (Mòbil): `quasar dev -m capacitor -T android`.