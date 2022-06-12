FROM python:3.10
WORKDIR /app
COPY app/ ./app
COPY sample_instance/ ./instance
COPY requirements.txt .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]