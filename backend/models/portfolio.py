from pydantic import BaseModel


class Project(BaseModel):
    title: str
    description: str
    github: str


class Portfolio(BaseModel):
    name: str
    role: str
    skills: list[str]
    projects: list[Project]