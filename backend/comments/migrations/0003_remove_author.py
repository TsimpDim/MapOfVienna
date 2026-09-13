from django.db import migrations


def clean_orphan_permissions(apps, schema_editor):
    """Remove auth_permission rows whose content type no longer exists.

    The Thread -> Comment rename left stale permissions behind, which trips
    SQLite's foreign-key constraint check when a later migration rebuilds a
    table. Deleting them here keeps the database consistent.
    """
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')
    valid_ids = set(ContentType.objects.values_list('id', flat=True))
    Permission.objects.exclude(content_type_id__in=valid_ids).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_rename_thread_to_comment'),
    ]

    operations = [
        migrations.RunPython(clean_orphan_permissions, migrations.RunPython.noop),
        migrations.RemoveField(
            model_name='comment',
            name='author',
        ),
        migrations.RemoveField(
            model_name='reply',
            name='author',
        ),
    ]
