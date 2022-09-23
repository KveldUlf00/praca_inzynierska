import flask
from flask import jsonify
from flask import render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import json
import os
import runpy

settingsFile = "..\\settings.json"
UPLOAD_FOLDER = "..\\Videos"
PATH = "C:\\Users\\raduc\\PycharmProjects\\faceRecognition"

def http_send():
    app = flask.Flask(__name__)
    app.config["DEBUG"] = True
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    def changeSetting(input):
        with open(settingsFile) as f:
            data = json.load(f)
        setting, value = input.split("-")
        if setting != "videoHandler":
            if setting != "predictValue":
                if value == 'true':
                    value = True
                else:
                    value = False
        else:
            if value == "Brak":
                value = ""
            else:
                value = f'Videos\\{value}'

        data[setting] = value

        with open(settingsFile, 'w', encoding='utf-8') as f:
            json.dump(data, f, sort_keys=True, ensure_ascii=False, indent=4)


    @app.route('/', methods=['GET'])
    def home():
        return '''<h1>Pobieranie danych</h1>
    <p>Witaj podróżniku</p>'''

    @app.route('/settings/', methods=['GET'])
    def getSettings():
        with open(settingsFile) as f:
            data = json.load(f)

        return jsonify(data)

    @app.route('/settings/<string:setting>', methods=['GET'])
    def postSetting(setting: str):
        changeSetting(setting)

        with open(settingsFile) as f:
            data = json.load(f)

        return jsonify(data)

    @app.route('/settings/videos', methods=['GET'])
    def getVideos():
        data = os.listdir("..\\Videos")

        return jsonify(data)

    @app.route('/run', methods=['GET'])
    def run():
        runpy.run_path(path_name="..\\main.py")

        return jsonify({"message": "success"})

    @app.route('/file', methods=['GET', 'POST'])
    def fileMethod():
        if request.method == 'POST':
            # save the single "profile" file
            file = request.files['file']

            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # return redirect(url_for('download_file', name=filename))
            return jsonify({"message": "success"})

        return jsonify({"message": "failure"})

    app.run()

http_send()
