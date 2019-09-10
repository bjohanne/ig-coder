from flask import Flask
from flask_restplus import Api, Resource, cors
app = Flask(__name__)
api = Api(app=app)

@api.route("/test/")
class Test(Resource):
    @cors.crossdomain(origin='*')
    def get(self):
        """
        returns a list of conferences
        """
        return "Get some data from the server!"

    def post(self):
        """
        Adds a new conference to the list
        """
        
@api.route("/test/<int:id>")
class TestTwo(Resource):
    def get(self, id):
        """
        Displays a conference's details
        """
    def put(self, id):
        """
        Edits a selected conference
        """
