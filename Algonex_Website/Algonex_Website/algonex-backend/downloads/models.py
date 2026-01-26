from django.db import models

class ResumeDownload(models.Model):
    email = models.EmailField()
    template_id = models.CharField(max_length=100)
    template_title = models.CharField(max_length=200, blank=True, null=True)
    downloaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.template_id}"
