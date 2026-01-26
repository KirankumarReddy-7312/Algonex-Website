#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# COMPATIBILITY PATCH FOR PYTHON 3.14
# Fixes AttributeError: 'super' object has no attribute 'dicts' 
# and TypeError: RequestContext missing 'request' argument
try:
    import django.template.context as d_context
    def patched_copy(self):
        # Create a new instance without calling __init__ to avoid argument requirements
        new_copy = object.__new__(self.__class__)
        # Copy the internal state
        new_copy.__dict__.update(self.__dict__)
        # Ensure the 'dicts' list is a fresh copy as intended by Django
        if hasattr(self, 'dicts'):
            new_copy.dicts = self.dicts[:]
        return new_copy
    d_context.BaseContext.__copy__ = patched_copy
except Exception:
    pass


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
