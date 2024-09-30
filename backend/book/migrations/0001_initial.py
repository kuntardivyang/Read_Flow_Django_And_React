# Generated by Django 4.2.4 on 2023-09-28 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kind', models.CharField(max_length=100)),
                ('google_id', models.CharField(max_length=20, unique=True)),
                ('title', models.CharField(max_length=200)),
                ('authors', models.TextField()),
                ('publisher', models.CharField(max_length=100)),
                ('published_date', models.DateField()),
                ('description', models.TextField()),
                ('page_count', models.PositiveIntegerField()),
                ('categories', models.TextField()),
                ('language', models.CharField(max_length=10)),
                ('small_thumbnail', models.URLField()),
                ('thumbnail', models.URLField()),
                ('preview_link', models.URLField()),
                ('country', models.CharField(max_length=2)),
                ('saleability', models.CharField(max_length=20)),
                ('is_ebook', models.BooleanField()),
                ('list_price_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('list_price_currency_code', models.CharField(max_length=5)),
                ('retail_price_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('retail_price_currency_code', models.CharField(max_length=5)),
            ],
        ),
    ]
