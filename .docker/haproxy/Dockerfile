FROM haproxy:2.5.5-bullseye

RUN git clone https://github.com/haproxytech/haproxy-lua-oauth.git \
    && cd haproxy-lua-oauth \
    && chmod +x ./install.sh \
    && sudo ./install.sh luaoauth

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
