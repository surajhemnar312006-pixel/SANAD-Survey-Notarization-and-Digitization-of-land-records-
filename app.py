from flask import Flask, render_template

# Flask(__name__) creates the app. __name__ tells Flask where to look
# for the templates/ and static/ folders (in the same directory as this file).
app = Flask(__name__)

# @app.route("/") is a "decorator" - it tells Flask: "when someone visits
# the homepage URL, run the function below it."
@app.route("/")
def dashboard():
    # render_template looks inside templates/ for this file and returns it
    # as the page the browser sees. We also pass some sample data in -
    # Phase 5 will replace this with real data pulled from the database.
    records = [
        {"name": "Ramesh Patil", "survey": "123/A", "village": "Wagholi",
         "confidence": 95, "status": "verified"},
        {"name": "Sita Devi", "survey": "456/B", "village": "Kharadi",
         "confidence": 72, "status": "pending"},
        {"name": "Anil Kumar", "survey": "789/C", "village": "Hadapsar",
         "confidence": 58, "status": "review"},
    ]
    stats = {"total": 128, "verified": 94, "pending": 24, "conflicts": 10}
    return render_template("index.html", records=records, stats=stats)

# This block only runs when you execute "python app.py" directly.
# debug=True auto-reloads the server whenever you save a file - very
# useful while building.
if __name__ == "__main__":
    app.run(debug=True)
