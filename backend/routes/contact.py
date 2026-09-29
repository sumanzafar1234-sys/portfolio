import os
import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


    @router.post("/")
    def send_contact_message(contact: ContactMessage):

        api_key = os.getenv("RESEND_API_KEY")

        if not api_key:
            raise HTTPException(
        status_code=500,
        detail="RESEND_API_KEY is not configured."
    )

    resend.api_key = api_key

    try:
        params = {
            "from": "onboarding@resend.dev",
            "to": ["sumanzafar1234@gmail.com"],
            "subject": f"New Portfolio Message from {contact.name}",
            "html": f"""
            <h2>New Portfolio Contact Message</h2>

            <p><strong>Name:</strong> {contact.name}</p>

            <p><strong>Email:</strong> {contact.email}</p>

            <p><strong>Message:</strong></p>

            <p>{contact.message}</p>
            """
        }

        result = resend.Emails.send(params)

        return {
            "success": True,
            "message": "Message sent successfully!",
            "result": result
        }

    except Exception as error:
        print("RESEND ERROR:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to send email."
        )