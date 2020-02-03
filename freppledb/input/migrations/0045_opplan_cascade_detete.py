# Generated by Django 2.2.4 on 2020-02-03 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('input', '0044_squashed_60'),
    ]

    operations = [
        migrations.AlterField(
            model_name='operationplanmaterial',
            name='operationplan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='materials', to='input.OperationPlan', verbose_name='reference'),
        ),
        migrations.AlterField(
            model_name='operationplanresource',
            name='operationplan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resources', to='input.OperationPlan', verbose_name='reference'),
        ),
    ]
