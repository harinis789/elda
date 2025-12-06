import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, SessionLocal
from app import models, schemas, crud

async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.drop_all)
        await conn.run_sync(models.Base.metadata.create_all)

    async with SessionLocal() as db:
        products = [
            schemas.ProductCreate(
                name="Golden Glow Turmeric Wash",
                description="A gentle, radiance-boosting face wash infused with organic turmeric and honey.",
                price=28.00,
                category="Face Wash",
                image_url="https://images.unsplash.com/photo-1556228720-19875c4b84b2?auto=format&fit=crop&w=800&q=80",
                is_featured=True
            ),
            schemas.ProductCreate(
                name="Midnight Sage Elixir",
                description="A potent night serum with sage and lavender to calm and repair skin.",
                price=55.00,
                category="Oils",
                image_url="https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80",
                is_featured=True
            ),
            schemas.ProductCreate(
                name="Velvet Rose Cream",
                description="Rich, hydrating cream with rosewater and shea butter for deep moisture.",
                price=42.00,
                category="Moisturizers",
                image_url="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
                is_featured=False
            ),
            schemas.ProductCreate(
                name="Saffron & Silk Eye Balm",
                description="Luxurious eye balm with saffron extract to reduce dark circles.",
                price=38.00,
                category="Eye Care",
                image_url="https://images.unsplash.com/photo-1571781926291-28b46c54908d?auto=format&fit=crop&w=800&q=80",
                is_featured=False
            ),
            schemas.ProductCreate(
                name="Forest Clay Mask",
                description="Detoxifying clay mask with green tea and matcha.",
                price=32.00,
                category="Masks",
                image_url="https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800&q=80",
                is_featured=True
            )
        ]

        for product in products:
            await crud.create_product(db, product)
            print(f"Created product: {product.name}")

if __name__ == "__main__":
    asyncio.run(seed_data())
