from pydantic import BaseModel
from typing import Optional, List

class ChatRequest(BaseModel):
    prompt: str
    model: str = "gpt-4-turbo"

class ImageRequest(BaseModel):
    prompt: str
    size: str = "1024x1024"

class PaymentRequest(BaseModel):
    amount: int
    currency: str = "pln"
    description: str
