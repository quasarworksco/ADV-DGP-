#!/bin/bash
# ──────────────────────────────────────────────────────────────
# DGP Global Group · WhatsApp del panel (WAHA, gratis y de código abierto)
# Se ejecuta UNA vez en la máquina de Google Cloud (Ubuntu), con:
#   curl -fsSL https://adv.dgp-link.com/wa/instalar.sh | sudo bash
# Instala: Docker, WAHA (motor GOWS, liviano) y Caddy (candado https automático).
# Al final muestra 3 datos para guardar en Cloudflare como secretos.
# ──────────────────────────────────────────────────────────────
set -e
if [ "$(id -u)" != "0" ]; then echo "Ejecútalo con sudo"; exit 1; fi
DIR=/opt/dgp-whatsapp
BOT=https://ayudante-dgp-bot.dgpgroupusa-llc.workers.dev
mkdir -p $DIR && cd $DIR

echo "▶ 1/5 Preparando la máquina…"
# Una máquina recién creada sigue instalando actualizaciones unos minutos: se reintenta hasta que apt esté libre
esperar_apt() {
  for i in $(seq 1 60); do
    if apt-get update -qq >/dev/null 2>&1; then return 0; fi
    [ "$i" = "1" ] && echo "   Ubuntu está terminando sus actualizaciones; reintentando (máximo 5 minutos)…"
    sleep 5
  done
  echo "   ✗ Ubuntu sigue ocupado. Espera unos minutos y vuelve a correr el comando."; exit 1
}
esperar_apt
# Memoria extra (la máquina gratis tiene 1 GB)
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q /swapfile /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi
for i in 1 2 3 4 5 6; do apt-get install -y -qq ca-certificates curl openssl >/dev/null 2>&1 && break; sleep 10; done

echo "▶ 2/5 Instalando Docker…"
if ! command -v docker >/dev/null; then
  esperar_apt
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh >/tmp/docker-install.log 2>&1 || { echo "   ✗ No se pudo instalar Docker. Detalle:"; tail -15 /tmp/docker-install.log; exit 1; }
fi
systemctl enable --now docker >/dev/null

echo "▶ 3/5 Creando las claves…"
# Se crean una sola vez; si ya existen se reutilizan
if [ ! -f $DIR/.env ]; then
  cat > $DIR/.env <<EOF
WAHA_API_KEY=$(openssl rand -hex 24)
WA_HMAC=$(openssl rand -hex 24)
WAHA_DASHBOARD_PASSWORD=$(openssl rand -hex 8)
EOF
  chmod 600 $DIR/.env
fi
. $DIR/.env
# Dirección pública de la máquina → nombre con candado automático (sslip.io)
IP=$(curl -fsSL -H 'Metadata-Flavor: Google' http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip 2>/dev/null || curl -fsSL https://api.ipify.org)
HOST="wa-$(echo $IP | tr '.' '-').sslip.io"

echo "▶ 4/5 Instalando WhatsApp (WAHA) y el candado (Caddy)…"
cat > $DIR/docker-compose.yml <<EOF
services:
  waha:
    image: devlikeapro/waha:gows
    restart: always
    environment:
      - WHATSAPP_DEFAULT_ENGINE=GOWS
      - WAHA_API_KEY=${WAHA_API_KEY}
      - WAHA_DASHBOARD_ENABLED=true
      - WAHA_DASHBOARD_USERNAME=dgp
      - WAHA_DASHBOARD_PASSWORD=${WAHA_DASHBOARD_PASSWORD}
      - WHATSAPP_HOOK_URL=${BOT}/whatsapp/webhook
      - WHATSAPP_HOOK_EVENTS=message,message.any,session.status
      - WHATSAPP_HOOK_HMAC_KEY=${WA_HMAC}
      - WHATSAPP_RESTART_ALL_SESSIONS=True
      - WAHA_RESTART_ALL_SESSIONS=True
      - WAHA_PRINT_QR=False
      - TZ=America/New_York
    volumes:
      - ./sesiones:/app/.sessions
      - ./medios:/app/.media
    expose:
      - "3000"
  caddy:
    image: caddy:2
    restart: always
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from ${HOST} --to waha:3000
    volumes:
      - ./caddy:/data
EOF
docker compose pull -q
docker compose up -d

echo "▶ 5/5 Esperando que arranque (hasta 2 minutos)…"
for i in $(seq 1 40); do
  if curl -fsS -m 5 -H "X-Api-Key: ${WAHA_API_KEY}" "https://${HOST}/api/sessions" >/dev/null 2>&1; then OK=1; break; fi
  sleep 3
done

echo
echo "══════════════════════════════════════════════════════════════"
if [ "$OK" = "1" ]; then echo " ✅ WhatsApp del panel instalado y funcionando"; else echo " ⚠️ Instalado, pero todavía no responde. Espera 2 minutos y vuelve a correr el mismo comando."; fi
echo "══════════════════════════════════════════════════════════════"
echo
echo " Guarda estos 3 datos en Cloudflare → Workers → ayudante-dgp-bot"
echo " → Settings → Variables and Secrets → Add → Type: Secret"
echo
echo "   WA_URL   = https://${HOST}"
echo "   WA_KEY   = ${WAHA_API_KEY}"
echo "   WA_HMAC  = ${WA_HMAC}"
echo
echo " Panel de respaldo de WAHA: https://${HOST}/dashboard"
echo "   usuario: dgp   ·   clave: ${WAHA_DASHBOARD_PASSWORD}"
echo
echo " No compartas estas claves en chats. Si las pierdes, vuelve a"
echo " correr este comando: te las muestra de nuevo."
echo "══════════════════════════════════════════════════════════════"
