# JobPT

An intelligent job search support service that **filters job postings**, provides **summaries of company information**, and **analyses resumes with personalised feedback**. The aim is to streamline the repetitive and time-consuming aspects of job hunting, ensuring that job seekers can effectively showcase their skills and avoid missing valuable opportunities.

---

## Service Overview

Modern job seekers often face repetitive tasks—searching for relevant job postings, tailoring their resumes repeatedly, and struggling to highlight their strengths in the most effective manner. **JobPT** tackles these challenges with:

1. **Job Posting Filtering**: Helps narrow down relevant openings.  
2. **Company Summaries**: Automatically aggregates and summarises essential information about prospective employers.  
3. **Resume Analysis & Feedback**: Provides in-depth analysis of your CV, offering suggestions for improvement and highlighting the strengths that match specific job requirements.

Below is a brief pipeline of how the system operates:

![System Pipeline](https://github.com/user-attachments/assets/4395063c-5c8b-41ea-b49e-33d73eadedb2)

---

## Building the Database

JobPT uses a semantic chunking mechanism and a vector database (ChromaDB) to store and retrieve relevant text segments efficiently.

![Inserting Dataset into VectorDB](https://github.com/user-attachments/assets/88ba566b-0a5f-46a5-9344-9807b838e8d5)

---

## How to Use the System

### 1. Extract the OmniParser Folder

1. Within the `system` folder, locate `OmniParser_v1.zip`.  
2. Unzip the archive **exactly** as `OmniParser_v1` (the folder name must remain unchanged).

### 2. Install Project Dependencies

In the main project directory, run:

```bash
pip install -r requirements.txt
```

### 3.Register Your OPENAI_API_KEY
```bash
export OPENAI_API_KEY=[YOUR_OPENAI_API_KEY]
```
Replace `[YOUR_OPENAI_API_KEY]` with your actual API key obtained from OpenAI.

### 4. Set Up Chroma DB
Navigate to the `system` folder and insert chunked documents into the vector database:

```bash
cd system
python insert_chunks.py
```

### 5. Launch the API
Run:

```bash
python system/main.py
```
This starts the main server to handle resume matching and feedback requests.

---

## Example API Call
Below is a sample Python script (```api_test.py```) showing how to send a POST request to the JobPT API:

```python
import requests

# POST request function
def send_post_request(resume_path):
    url = "http://localhost:8000/matching"  # Replace with the actual API endpoint
    data = {"resume_path": resume_path}

    try:
        response = requests.post(url, json=data)
        response.raise_for_status()  # Raise an exception if status code is not 2xx
        print("POST request successful:", response.json())
    except requests.exceptions.RequestException as e:
        print("Error during POST request:", e)

# Example function call
send_post_request("data/joannadrummond-cv.pdf")
```

- `resume_path`: Path to the resume (PDF, DOCX, etc.) you’d like to analyse.
- The API responds with JSON data detailing the matching score and feedback for the resume.

---

## Features Summary

- **Job Post Filtering**: Sifts through numerous postings to recommend the most relevant ones for your skillset.
- **Company Information Summaries**: Automatically compiles key data on target companies.
- **Resume Analysis**: Inspects your CV, rating its relevance and offering specific advice on improvements.
- **Personalised Feedback**: Supplies a tailored evaluation for each job position, guiding you to revise and refine your resume.
By combining chunk-based semantic retrieval, ChromaDB for vector storage, and an AI-driven analysis module, **JobPT** offers a cohesive solution to expedite the job application process.

**Thank you for using JobPT!**

We hope this service significantly enhances your job search experience, helping you spend less time on repetitive tasks and more time on the opportunities that truly matter.