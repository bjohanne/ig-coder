from swagger_tester import swagger_test

# Dict containing the errors you don't want to raise.
# By default, every status_code over other than 1xx, 2xx or 3xx
# will be considered as an error.
authorize_error = {
    'post': {
        '/users': [201, 400, 409],
        '/projects': [201, 400, 501],
        '/documents': [201, 400, 403]
    },
    'get': {
        '/users': [200, 204],
        '/users/{user_id}': [200, 400, 404],
        '/projects/{project_id}': [200, 400, 403, 404, 501],
        '/documents/{document_id}': [200, 400, 403, 404]
    },
    'patch': {
        '/users/{user_id}': [200, 400, 404, 501],
        '/projects/{project_id}': [200, 400, 403, 404, 501],
        '/documents/{document_id}': [200, 400, 403, 404]
    },
    'delete': {
        '/projects/{project_id}': [200, 400, 403, 404, 501],
        '/documents/{document_id}': [200, 400, 403, 404, 501]
    }
}

# Run the test with connexion
# An AssertionError will be raised in case of error.
swagger_test('api_spec.yaml', authorize_error=authorize_error)
