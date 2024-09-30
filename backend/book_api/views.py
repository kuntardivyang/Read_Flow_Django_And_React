from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from book.models import Book
from django.db.models import Q
from book.serializers import BookSerializer

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class FictionBookList(generics.ListAPIView):
    queryset = Book.objects.filter(categories__icontains='fiction')
    serializer_class = BookSerializer

class HistoryBookList(generics.ListAPIView):
    queryset = Book.objects.filter(
        Q(categories__icontains='science') |
        Q(categories__icontains='history') |
        Q(categories__icontains='literary') |
        Q(categories__icontains='art')
    )
    serializer_class = BookSerializer

class HealingBookList(generics.ListAPIView):
    queryset = Book.objects.filter(
        Q(categories__icontains='self-help') |
        Q(categories__icontains='humor') |
        Q(categories__icontains='Young Adult Fiction')
    )
    serializer_class = BookSerializer

class BusinessBookList(generics.ListAPIView):
    queryset = Book.objects.filter(
        Q(categories__icontains='Business & Economics') |
        Q(categories__icontains='Biography & Autobiography') 
    )
    serializer_class = BookSerializer

class BookDetail(RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'google_id'

class BookSearchAPIView(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        # print(query)
        queryset = Book.objects.filter(title__icontains=query)
        return queryset
    