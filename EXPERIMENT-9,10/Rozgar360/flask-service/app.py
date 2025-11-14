from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import fitz  # PyMuPDF for PDF parsing
import os

# 1️⃣ Define app first
app = Flask(__name__)

# 2️⃣ Enable CORS after app is defined
CORS(app)

def extract_text_from_pdf(file_path):
    """Extract text from uploaded PDF"""
    text = ""
    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text("text")
    return text

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    try:
        if 'resume' not in request.files or 'jobDesc' not in request.form:
            return jsonify({"error": "Missing resume or job description"}), 400

        resume_file = request.files['resume']
        job_desc = request.form['jobDesc']

        # Save temporarily
        file_path = os.path.join("uploads", resume_file.filename)
        resume_file.save(file_path)

        # Extract text from resume
        resume_text = extract_text_from_pdf(file_path)

        # TF-IDF vectorization
        vectorizer = TfidfVectorizer(stop_words='english')
        vectors = vectorizer.fit_transform([job_desc, resume_text])

        # Cosine similarity
        similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
        score = round(similarity * 100, 2)

        # Extract keywords
        job_keywords = set(job_desc.lower().split())
        resume_keywords = set(resume_text.lower().split())
        missing = list(job_keywords - resume_keywords)[:10]

        # Prepare response
        result = {
            "score": score,
            "analysis": "Strong match!" if score > 70 else "Your resume needs more alignment with job keywords.",
            "missing": missing,
            "skillComparison": [
                {"skill": kw, "resume": 1 if kw in resume_keywords else 0, "job": 1}
                for kw in list(job_keywords)[:6]
            ]
        }

        # Clean up
        os.remove(file_path)

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    os.makedirs("uploads", exist_ok=True)
    app.run(port=7000, debug=True)
