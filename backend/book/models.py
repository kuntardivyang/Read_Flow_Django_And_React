from django.db import models
from user_api.models import AppUser

# Create your models here.
class Book(models.Model):
    kind = models.CharField(max_length=100)
    google_id = models.CharField(max_length=20, unique=True)  # Use the 'id' field as the primary key
    title = models.CharField(max_length=200)
    authors = models.TextField()  # You can store authors as a comma-separated string
    publisher = models.CharField(max_length=100)
    published_date = models.DateField()
    description = models.TextField()
    page_count = models.PositiveIntegerField()
    categories = models.TextField()  # Store categories as a comma-separated string
    language = models.CharField(max_length=10)
    small_thumbnail = models.URLField()
    thumbnail = models.URLField()
    preview_link = models.URLField()

    # SaleInfo fields
    country = models.CharField(max_length=2)
    saleability = models.CharField(max_length=20)
    is_ebook = models.BooleanField()
    list_price_amount = models.DecimalField(max_digits=10, decimal_places=2)
    list_price_currency_code = models.CharField(max_length=5)
    retail_price_amount = models.DecimalField(max_digits=10, decimal_places=2)
    retail_price_currency_code = models.CharField(max_length=5)

    def __str__(self):
        return self.title

class Wishlist(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book)

    def __str__(self):
        return f"Wishlist of {self.user.username}"