# Generated by Django 4.2.9 on 2024-04-16 09:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_alter_posts_options_alter_comment_timestamp'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-timestamp']},
        ),
    ]
