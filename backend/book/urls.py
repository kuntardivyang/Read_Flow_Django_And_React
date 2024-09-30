from django.urls import path
from .views import GoogleBooksSync, WishListView, WishListDetail, DeleteWishListView

urlpatterns = [
    path('sync_google_books/', GoogleBooksSync.as_view(), name='sync_google_books'),
    path('wishlist/', WishListView.as_view(), name='wishlist'),
    path('deletewishlist/', DeleteWishListView.as_view(), name='deletewishlist'),
    path('wishlistdetail/', WishListDetail.as_view(), name='wishlistdetails'),
    # path('checkwishlist/', update_wishlist_count, name='checkwishlist'),
]
