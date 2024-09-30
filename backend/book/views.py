# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Book
from .serializers import WishListSerializer, WishListDetailSerializer
from rest_framework import generics
from .models import Wishlist
from user_api.models import AppUser
from django.shortcuts import get_object_or_404
from backend.settings import API_KEY

class GoogleBooksSync(APIView):
    def get(self, request):
        # List of Google Books API URLs to fetch data from
        google_books_urls = [
            f'https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&maxResults=40&startIndex=0&key={API_KEY}',
            f'https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&maxResults=40&startIndex=40&key={API_KEY}',
            f'https://www.googleapis.com/books/v1/volumes?q=bestseller&filter=paid-ebooks&orderBy=relevance&saleability=FOR_SALE&maxResults=20&startIndex=80&key={API_KEY}',
        ]

        books = []  # List to store Book objects

        for url in google_books_urls:
            try:
                response = requests.get(url)
                response.raise_for_status()  # Raise an HTTPError for bad responses (e.g., 404)
                # print(API_KEY)
                data = response.json().get('items', [])

                for item in data:
                    # Create a Book object for each item and add it to the list
                    book = Book(
                        kind=item['kind'],
                        google_id=item['id'],
                        title=item['volumeInfo']['title'],
                        authors=", ".join(item['volumeInfo'].get('authors', [])),
                        publisher=item['volumeInfo'].get('publisher', ''),
                        published_date=item['volumeInfo'].get('publishedDate', ''),
                        description=item['volumeInfo'].get('description', ''),
                        page_count=item['volumeInfo'].get('pageCount', 0),
                        categories=", ".join(item['volumeInfo'].get('categories', [])),
                        language=item['volumeInfo'].get('language', ''),
                        small_thumbnail=item['volumeInfo']['imageLinks'].get('smallThumbnail', ''),
                        thumbnail=item['volumeInfo']['imageLinks'].get('thumbnail', ''),
                        preview_link=item['volumeInfo'].get('previewLink', ''),
                        country=item['saleInfo'].get('country', ''),
                        saleability=item['saleInfo'].get('saleability', ''),
                        is_ebook=item['saleInfo'].get('isEbook', False),
                        list_price_amount=item['saleInfo']['listPrice'].get('amount', 0.0),
                        list_price_currency_code=item['saleInfo']['listPrice'].get('currencyCode', ''),
                        retail_price_amount=item['saleInfo']['retailPrice'].get('amount', 0.0),
                        retail_price_currency_code=item['saleInfo']['retailPrice'].get('currencyCode', ''),
                    )
                    books.append(book)
            except requests.exceptions.RequestException as e:
                # Handle API request errors, e.g., network issues or invalid URLs
                return Response(f"API request error: {str(e)}", status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                # Handle other exceptions (e.g., JSON parsing error)
                return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Bulk insert the books into the database for better performance
        Book.objects.bulk_create(books)

        return Response("Books imported successfully", status=status.HTTP_200_OK)

class WishListView(generics.ListCreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishListSerializer

    def post(self, request):
        book_id = request.data.get('books')
        user_id = request.data.get('user')
        book = get_object_or_404(Book, id=book_id)
        if book:
            try:
                name = book
                # print(Wishlist.objects.get(user=user_id).books.all())
                if name in Wishlist.objects.get(user=user_id).books.all():
                    return Response("already in wishlist", status=status.HTTP_204_NO_CONTENT)
                else:
                    user = AppUser.objects.get(id=user_id)
                    Wishlist.objects.get(user=user).books.add(book_id)
                    return Response("add into wishlist", status=status.HTTP_201_CREATED)
            except:
                user_id = request.data.get('user')
                user = get_object_or_404(AppUser, id=user_id)
                wishlist = Wishlist.objects.create(user=user)
                wishlist.books.add(book_id)
                return Response("add into wishlist", status=status.HTTP_201_CREATED)
        return Response("book not found")

class WishListDetail(generics.ListAPIView):
    serializer_class = WishListDetailSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user', '')
        wishlist = Wishlist.objects.get(user=user_id).books.all()
        # print(wishlist)
        return wishlist
    
class DeleteWishListView(generics.DestroyAPIView):
    serializer_class = WishListSerializer
    def post(self, request):
        user_id = request.data.get('user')
        book_id = request.data.get('books')
        wishlist = Wishlist.objects.get(user=user_id)
        wishlist.books.remove(book_id)
        # print(wishlist)
        wishlist.save()
        return Response("removed")