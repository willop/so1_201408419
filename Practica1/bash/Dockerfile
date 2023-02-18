FROM ubuntu

COPY ./script.sh ./

RUN apt-get update && \
    apt-get install -y nano && \
    rm -fr /var/lib/apt/lists/*

CMD ["tail", "/dev/null"]