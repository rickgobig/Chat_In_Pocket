from fastapi import APIRouter, HTTPException
from app.models import PaymentRequest
from app.services import PaymentService

router = APIRouter(prefix="/api/payments", tags=["Payments"])

@router.post("/create-checkout-session")
async def create_checkout_session(request: PaymentRequest):
    try:
        session = await PaymentService.create_checkout_session(
            amount=request.amount,
            currency=request.currency,
            description=request.description
        )
        return {"session_id": session.id, "url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))