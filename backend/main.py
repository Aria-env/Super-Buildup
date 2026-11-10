
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from auth import router as auth_router
from auth.auth import router as auth_router

app = FastAPI(
    title="ARIA Backend",
    description="Backend API for ARIA Authentication System",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect authentication routes
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to ARIA Backend!",
        "status": "Running"
    }
