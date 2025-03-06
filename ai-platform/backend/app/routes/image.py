from fastapi import APIRouter, HTTPException
from app.models import ImageRequest
from app.services import OpenAIService

router = APIRouter(prefix="/api/image", tags=["Image"])

@router.post("/")
async def generate_image(request: ImageRequest):
    try:
        image_url = await OpenAIService.generate_image(
            prompt=request.prompt,
            size=request.size
        )
        return {"image_url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))