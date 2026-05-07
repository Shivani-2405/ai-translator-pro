from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route('/')
def home():

    return render_template('index.html')

@app.route('/translate',
methods=['POST'])

def translate():

    try:

        data = request.get_json()

        text = data['text']

        source = data['source']

        target = data['target']

        translated = GoogleTranslator(

            source=source,

            target=target

        ).translate(text)

        return jsonify({

            "translatedText":
            translated

        })

    except Exception as e:

        print(e)

        return jsonify({

            "translatedText":
            "Translation Failed"

        })

if __name__ == '__main__':

    app.run(debug=True)