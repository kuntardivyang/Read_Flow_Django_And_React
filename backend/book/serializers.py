# serializers.py
from rest_framework import serializers
from .models import Book, Wishlist

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

class WishListDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('id', )
