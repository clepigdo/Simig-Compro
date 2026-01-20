# Gunakan Nginx sebagai base image
FROM nginx:alpine

# Salin semua file dari folder project ke folder default Nginx
COPY . /usr/share/nginx/html

# --- BAGIAN PENTING ---
# Kita gunakan script 'sed' untuk mengedit konfigurasi Nginx saat container dijalankan.
# Ini akan mengubah "listen 80;" menjadi "listen [PORT_RAILWAY];" secara otomatis.
CMD /bin/sh -c "sed -i 's/listen  *80;/listen '$PORT';/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"