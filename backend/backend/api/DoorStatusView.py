import json

from django.http import HttpResponse
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)


def fetch_view(request):
    logger.info('Fetching data')

    return HttpResponse(JsonResponse({'status': 'open'}), status=200, content_type='application/json')