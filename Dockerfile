# Gunakan Nginx sebagai base image (ringan dan cepat)
FROM nginx:alpine

# Salin semua file dari folder project ke folder default Nginx di server
COPY . /usr/share/nginx/html

# Expose port 80 agar bisa diakses internet
EXPOSE 80