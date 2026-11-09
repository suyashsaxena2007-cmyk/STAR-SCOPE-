import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

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

class ChatRequest(BaseModel):
    messages: list[dict]

@app.get("/")
def home():
    return {"message": "Starscope AI backend is running!", "status": "online"}

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise HTTPException(status_code=500, detail="API key is missing in backend/.env")

    try:
        # Keep only valid conversation messages.
        conversation = []
        for message in request.messages[-20:]:
            role = message.get("role")
            content = message.get("content")

            if role in ("user", "assistant") and isinstance(content, str):
                conversation.append({"role": role, "content": content})

        if not conversation or conversation[-1]["role"] != "user":
            raise HTTPException(status_code=400, detail="Please send a user message.")

        client = OpenAI(api_key=api_key)

        response = client.responses.create(
            model="gpt-5.5",
            instructions="""
You are Starscope AI, a friendly and knowledgeable space and astronomy assistant.

Your main topics include astronomy, planets, stars, galaxies, black holes,
rockets, satellites, space missions, ISRO, NASA, aerospace engineering,
and space science terminology.

Explain concepts clearly for beginners. Support follow-up questions by using
the conversation history. Be accurate, and admit uncertainty when needed.

If someone asks an unrelated question, politely explain that Starscope AI
focuses on space and astronomy, and invite them to ask a related question.
Do not pretend to have live information unless you have actually retrieved it.
""",
            input=conversation,
            max_output_tokens=700,
        )

        return {"reply": response.output_text}

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Starscope AI could not generate a reply. Check your API key, API access and available credits, then try again."
        )