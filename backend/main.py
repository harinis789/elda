from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Product(BaseModel):
    id: Optional[int] = None
    name: str
    price: float
    category: str
    description: str
    image_url: str

# Mock database
products_db: List[Product] = [
    Product(id=1, name="Golden Glow Face Wash", price=25.0, category="Face Wash", description="A gentle turmeric-infused face wash.", image_url="https://example.com/wash.jpg"),
    Product(id=2, name="Midnight Sage Scrub", price=30.0, category="Scrubs", description="Exfoliating scrub with sage and sea salt.", image_url="https://example.com/scrub.jpg"),
    Product(id=3, name="Radiance Oil", price=45.0, category="Oils", description="Hydrating oil for a natural glow.", image_url="https://example.com/oil.jpg"),
    Product(id=4, name="Velvet Cream", price=35.0, category="Moisturizers", description="Rich cream for dry skin.", image_url="https://example.com/cream.jpg"),
    Product(id=5, name="Forest Mist Toner", price=20.0, category="Toners", description="Refreshing toner with green tea.", image_url="https://example.com/toner.jpg")
]

@app.get("/products", response_model=List[Product])
def get_products():
    return products_db

@app.post("/products", response_model=Product)
def add_product(product: Product):
    product.id = len(products_db) + 1
    products_db.append(product)
    return product

@app.get("/product/{product_id}", response_model=Product)
def get_product(product_id: int):
    for product in products_db:
        if product.id == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
