# Generated by Django 3.1.1 on 2020-09-21 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('especialidade', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'especialidade',
                'verbose_name_plural': 'especialidades',
            },
        ),
    ]
