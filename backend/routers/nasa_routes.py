
from fastapi import APIRouter, HTTPException
from datetime import date
from modules.nasa import get_apod, get_asteroids

router = APIRouter(prefix="/api/nasa", tags=["NASA"])


@router.get("/apod")
async def apod():
    try:
        return await get_apod()
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/asteroids")
async def asteroids(
    start_date: date,
    end_date: date
):
    if (end_date - start_date).days > 7:
        raise HTTPException(
            status_code=400,
            detail="NASA asteroid feed supports a maximum 7-day date range."
        )

    try:
        return await get_asteroids(
            start_date.isoformat(),
            end_date.isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
