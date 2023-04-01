from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)


def some_view(request):
    logger.info('App is up and running')
    return JsonResponse({'foo': 'bar', 'hello': 'world'})




