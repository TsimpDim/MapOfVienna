from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='thread',
            name='threads_thr_distri_idx',
        ),
        migrations.RemoveIndex(
            model_name='thread',
            name='threads_thr_created_idx',
        ),
        migrations.RemoveIndex(
            model_name='reply',
            name='threads_rep_thread_idx',
        ),
        migrations.RenameModel(
            old_name='Thread',
            new_name='Comment',
        ),
        migrations.RenameField(
            model_name='reply',
            old_name='thread',
            new_name='comment',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='title',
        ),
    ]