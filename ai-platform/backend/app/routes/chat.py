from fastapi import APIRouter, HTTPException
from app.models import ChatRequest
from app.services import OpenAIService

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("/")
async def chat(request: ChatRequest):
    try:
        response = await OpenAIService.generate_chat_response(
            prompt=request.prompt,
            model=request.model
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))