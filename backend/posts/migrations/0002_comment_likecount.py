# Generated by Django 4.2.9 on 2024-04-01 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='likeCount',
            field=models.IntegerField(default=0),
        ),
    ]