import openai
import stripe
from app.config import OPENAI_API_KEY, STRIPE_SECRET_KEY

# Konfiguracja OpenAI
openai.api_key = OPENAI_API_KEY

# Konfiguracja Stripe
stripe.api_key = STRIPE_SECRET_KEY

class OpenAIService:
    @staticmethod
    async def generate_chat_response(prompt, model):
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    @staticmethod
    async def generate_image(prompt, size):
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            size=size
        )
        return response.data[0].url

class PaymentService:
    @staticmethod
    async def create_checkout_session(amount, currency, description):
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price_data": {
                        "currency": currency,
                        "product_data": {
                            "name": description,
                        },
                        "unit_amount": amount,
                    },
                    "quantity": 1,
                }],
                mode="payment",
                success_url="http://localhost:3000/success",
                cancel_url="http://localhost:3000/cancel",
            )
            return session
        except Exception as e:
            raise e