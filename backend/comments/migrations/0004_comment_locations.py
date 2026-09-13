from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_remove_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='district_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='location_key',
            field=models.CharField(blank=True, db_index=True, max_length=80, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='location_type',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='location_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='location_lat',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='location_lng',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
