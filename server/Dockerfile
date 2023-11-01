FROM ubuntu:22.04
FROM python:3.10
LABEL org.opencontainers.image.source https://github.com/biocompute-objects/portal_userdb
LABEL org.opencontainers.image.description="My container image"
LABEL org.opencontainers.image.licenses=MIT
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -qq update && apt-get install -y python3.10 python3-dev python3-pip

RUN python3 -m pip install --upgrade pip

WORKDIR /portal_userdb_server

COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt

COPY . ./

EXPOSE 8080
#CMD ["bash"]
ENTRYPOINT ["python3", "manage.py", "runserver"]
CMD ["0.0.0.0:8080"]