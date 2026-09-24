import os
from django.apps import AppConfig
from django.db.models.signals import post_migrate

def create_default_superuser(sender, **kwargs):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    admin_user = os.getenv("DJANGO_ADMIN_USERNAME", "admin")
    admin_email = os.getenv("DJANGO_ADMIN_EMAIL", "admin@mu.edu.bd")
    admin_pass = os.getenv("DJANGO_ADMIN_PASSWORD", "admin12345")

    try:
        user, created = User.objects.get_or_create(
            username=admin_user,
            defaults={'email': admin_email}
        )
        user.set_password(admin_pass)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        if created:
            print(f"Superuser '{admin_user}' created successfully with password '{admin_pass}'!")
        else:
            print(f"Superuser '{admin_user}' updated and ready for login.")
    except Exception as e:
        print("Note on superuser creation:", e)

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        post_migrate.connect(create_default_superuser, sender=self)
