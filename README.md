# Tech Stack

* **Backend:** Python, FastAPI
* **Frontend:** React, Vite
* **Database:** SQLite
* **Authentication:** JWT with HTTP-only cookies

---

# INSTALLATION

## Prerequisites

Ensure you have the following installed on your machine:

- **Python 3.10+**: https://www.python.org/downloads/
- **Node.js (v18+) & npm**: https://nodejs.org/

---

## 1. Backend Setup (FastAPI)

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment to isolate dependencies.

   **macOS / Linux:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   **Windows (Command Prompt / PowerShell):**

   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory with the following variables:

   ```env
   SECRET_KEY=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=sqlite:///./hardware_hub.db
   ENVIRONMENT=development
   FRONTEND_URL=http://localhost:5173
   COOKIE_DOMAIN=
   ```

   - **Secret Key Generation:** Generate a secure `SECRET_KEY` in your terminal:

     **macOS / Linux**

     ```bash
     python -c "import secrets; print(secrets.token_hex(32))"
     ```

     **Windows**

     ```powershell
     python -c "import secrets; print(secrets.token_hex(32))"
     ```

   - **Gemini API Key:** Obtain your `GEMINI_API_KEY` from **Google AI Studio** by creating an API key and copying it into your `.env` file.

5. Start the FastAPI development server:

   ```bash
   uvicorn main:app --reload
   ```

   - **Backend URL:** http://127.0.0.1:8000
   - **API Docs (Swagger UI):** http://127.0.0.1:8000/docs

---

## 2. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Create a `.env` file in the `frontend` directory:

   ```env
   API_URL=http://localhost:8000
   ```

3. Install the JavaScript dependencies:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

   - **Frontend URL:** Typically available at `http://localhost:5173` (check the terminal output for the exact port).

---

## Development Workflow

To run the project locally, keep **two terminal windows** open:

### Terminal 1 (Backend)

- Activate the virtual environment.
- Run:

  ```bash
  uvicorn main:app --reload
  ```

### Terminal 2 (Frontend)

- Navigate to the `frontend` directory.
- Run:

  ```bash
  npm run dev
  ```

---

## Running tests

From the project root, go to the backend, activate the virtual environment, and run pytest.

**macOS / Linux**
```bash
cd backend
source venv/bin/activate
pytest
```

**Windows (Command Prompt / PowerShell)**
```bash
cd backend
.\venv\Scripts\activate
pytest
```