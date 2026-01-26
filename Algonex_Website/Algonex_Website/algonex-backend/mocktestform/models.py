from django.db import models

class MockTestResult(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    course = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    score = models.IntegerField()
    total_questions = models.IntegerField()
    passed = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.course} ({self.score}/{self.total_questions})"
