# api_urls.py
from django.urls import path
from .views import BookListCreateView,FictionBookList,HistoryBookList, HealingBookList, BusinessBookList, BookDetail,BookSearchAPIView

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('fiction-books/', FictionBookList.as_view(), name='fiction-books'),
    path('history-books/', HistoryBookList.as_view(), name='category-books'),
    path('healing-books/', HealingBookList.as_view(), name='healing-books'),
    path('business-books/', BusinessBookList.as_view(), name='business-books'),
    path('search-book/<str:google_id>/', BookDetail.as_view(), name='book-detail'),
    path('book-search/', BookSearchAPIView.as_view(), name='book-search-api'),
]
