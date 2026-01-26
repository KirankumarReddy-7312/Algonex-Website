from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Welcome to Algonex API",
        "status": "Running",
        "endpoints": {
            "courses": "/api/courses",
            "signin": "/api/signin/signin/",
            "contact": "/api/submit-form/",
            "events": "/api/events/register/",
            "workshop": "/api/workshop/submit-workshop/",
            "mocktest": "/api/mocktest/submit-result/",
            "newsletter": "/api/newsletter/subscribe/",
            "career": "/api/career/apply/",
            "demo": "/api/demo/book/",
            "mock_interview": "/api/mock-interview/book/"
        }
    })
