from database import Base, engine
from auth import models

Base.metadata.create_all(bind=engine)

print("ARIA database tables created successfully!")