from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import portfolio, contact


app = FastAPI(
    title="Suman Zafar Portfolio API",
    description="Python backend for Suman Zafar's portfolio",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Portfolio API
app.include_router(portfolio.router)

# Contact Form API
app.include_router(contact.router)


@app.get("/")
def home():
    return {
"message": "Suman Zafar Python Backend is running"
}


@app.get("/api/python-test")
def python_test():
    return {
"language": "Python",
"framework": "FastAPI",
"status": "connected"
}