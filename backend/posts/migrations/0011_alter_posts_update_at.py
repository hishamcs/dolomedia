# Generated by Django 4.2.9 on 2024-06-22 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_alter_comment_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='update_at',
            field=models.DateTimeField(),
        ),
    ]