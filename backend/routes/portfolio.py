from fastapi import APIRouter
from models.portfolio import Portfolio

router = APIRouter(
    prefix="/api/portfolio",
    tags=["Portfolio"]
)


portfolio_data = Portfolio(
    name="Suman Zafar",
    role="Full Stack Developer",
    skills=[
        "Python",
        "JavaScript",
        "HTML",
        "CSS",
        "FastAPI",
        "Node.js"
    ],
    projects=[
        {
            "title": "LuxeMarket",
            "description": "Full-stack e-commerce project",
            "github": "#"
        },
        {
            "title": "HostelEase",
            "description": "Hostel management system",
            "github": "#"
        }
    ]
)


@router.get("/", response_model=Portfolio)
def get_portfolio():
    return portfolio_data