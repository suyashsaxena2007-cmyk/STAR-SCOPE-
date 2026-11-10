
from routers.nasa_routes import router as nasa_router

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI(
    title="STARSCOPE AI API",
    description="AI assistant for space and astronomy",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nasa_router)


class ChatRequest(BaseModel):
    messages: list[dict]


@app.get("/")
def home():
    return {
        "message": "Starscope AI backend is running!",
        "status": "online"
    }


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/chat")
async def chat(request: ChatRequest):

    conversation = []

    for message in request.messages[-20:]:
        role = message.get("role")
        content = message.get("content")

        if role in ("user", "assistant") and isinstance(content, str):
            conversation.append({
                "role": role,
                "content": content
            })

    if not conversation or conversation[-1]["role"] != "user":
        raise HTTPException(
            status_code=400,
            detail="Please send a user message."
        )

    messages = [
        {
            "role": "system",
            "content": """
You are Starscope AI, a friendly and knowledgeable space and astronomy assistant.

Your main topics include astronomy, planets, stars, galaxies, black holes,
rockets, satellites, space missions, ISRO, NASA, aerospace engineering,
and space science terminology.

Explain concepts clearly for beginners. Support follow-up questions using
conversation history. Be accurate and admit uncertainty when needed.

For unrelated questions, politely explain that Starscope AI focuses on
space and astronomy. Do not pretend to have live information.
"""
        },
        *conversation
    ]

    try:
        async with httpx.AsyncClient(timeout=180) as client:
            response = await client.post(
                "http://localhost:11434/api/chat",
                json={
                    "model": "llama3.2:3b",
                    "messages": messages,
                    "stream": False
                }
            )

            response.raise_for_status()
            result = response.json()

        return {
            "reply": result["message"]["content"]
        }

    except httpx.ConnectError:
        raise HTTPException(
            status_code=503,
            detail="Ollama is not running. Please start Ollama."
        )

    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Starscope AI could not generate a reply. Check Ollama and try again."
        )
