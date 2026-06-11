# React TypeScript + FastAPI Boilerplate

This project contains a Vite React TypeScript frontend and a Python FastAPI backend.

## Structure

```text
.
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   └── main.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── package.json
```

## Run The Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API is available at `http://localhost:8000`.

## Run The Frontend

```bash
cd frontend
npm install
npm run dev
```

The app is available at `http://localhost:5173`.

## API Docs

FastAPI provides interactive docs at:

- `http://localhost:8000/docs`
- `http://localhost:8000/redoc`
