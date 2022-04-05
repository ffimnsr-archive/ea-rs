ARG haproxy_version

FROM haproxy:${haproxy_version}

USER root
RUN apt-get update && apt install -y curl unzip
RUN curl -Lo haproxy-lua-oauth.zip https://github.com/haproxytech/haproxy-lua-oauth/archive/master.zip \
    && unzip haproxy-lua-oauth.zip \
    && cd haproxy-lua-oauth-master \
    && chmod +x ./install.sh \
    && ./install.sh luaoauth

COPY ./haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY ./pem /etc/haproxy/
USER haproxy
