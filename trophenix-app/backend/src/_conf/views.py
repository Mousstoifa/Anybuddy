from django.http import HttpRequest, JsonResponse


def health(_request: HttpRequest) -> JsonResponse:
    """Lightweight liveness endpoint used by load balancers and k8s probes."""
    return JsonResponse({"status": "ok"}, status=200)
