FROM eclipse-mosquitto
WORKDIR /mosquitto
COPY config config
RUN mosquitto_passwd -c -b /mosquitto/config/pwfile client secret
EXPOSE 1883 8883