
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

NASA_BASE_URL = "https://api.nasa.gov"


async def get_apod():
    api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")

    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(
            f"{NASA_BASE_URL}/planetary/apod",
            params={"api_key": api_key}
        )
        response.raise_for_status()
        return response.json()


async def get_asteroids(start_date: str, end_date: str):
    api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(
            f"{NASA_BASE_URL}/neo/rest/v1/feed",
            params={
                "start_date": start_date,
                "end_date": end_date,
                "api_key": api_key
            }
        )
        response.raise_for_status()
        return response.json()
