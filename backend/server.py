import flask
from flask import jsonify
from flask import request
from graphsHandler import transformData

def http_send():
    app = flask.Flask(__name__)
    app.config["DEBUG"] = True

    @app.route('/file', methods=['GET', 'POST'])
    def fileMethod():
        if request.method == 'POST':
            file = request.files['file']
            res = transformData(file)

            return jsonify({
                "network": res["data"],
                "fileName": res["fileName"],
                "cliques": res["cliques"],
                "corr": res["corr"],
                "corruptedAttr": res["corruptedAttr"]
            })

        return jsonify({"message": "failure"})

    app.run()

http_send()
