import json

from django.http import HttpResponse
from wsgiref.util import FileWrapper
import logging

logger = logging.getLogger(__name__)


def fetch_view(request):
    logger.info('Fetching all images')

    image_files_list = []
    try:
        all_documents = get_all_documents()
        for document in all_documents:
            # TODO remove this check once all images uploaded again
            if 'key_name' in document['system_metadata']:
                presigned_url = generate_file_url(document['system_metadata']['key_name'])
                image_files_list.append({"filename": document['system_metadata']['filename'],
                                         "key_name": document['system_metadata']['key_name'],
                                         "file_size_kb": document['system_metadata']['file_size_kb'],
                                         "timestamp": document['system_metadata']['timestamp'],
                                         "url": presigned_url})

        # bucket_contents = retrieve_file_list_from_cloud()
        # for content in bucket_contents:
        #     presigned_url = generate_file_url(content["Key"])
        #     image_files_list.append({"filename": content["Key"], "url": presigned_url})
    except Exception as e:
        # TODO return HTTP response 500
        logger.error("Unable to retrieve bucket contents: {0}".format(e))

    dump = json.dumps(image_files_list)
    return HttpResponse(dump, status=200, content_type='application/json')