# system-monitor
This is a system monitor webpage for monitoring processes remotely on a computer

![image](https://github.com/user-attachments/assets/041ea585-3ca1-4af8-bab8-01b36d1aaf3c)


# clone 
> git clone https://github.com/tmazumdar/system-monitor.git system-monitor

# change directory
> cd system-monitor

# run server
> ..\system-monitor> cd server  
> ..\system-monitor\server> npm install  
> ..\system-monitor\server> node server

```
T:\code\system-monitor\server>node server
Server listening on port 5050
```

# run client
> ..\system-monitor> cd client  
> ..\system-monitor\client> npm install  
> ..\system-monitor\client> npm run build  
> ..\system-monitor\client> npm run dev  

```
T:\code\system-monitor\client>npm run dev

> client@0.0.0 dev
> vite


  VITE v5.4.0  ready in 189 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

🌼   daisyUI 4.12.10
├─ ✔︎ 1 theme added             https://daisyui.com/docs/themes
╰─ ❤︎ Support daisyUI project:  https://opencollective.com/daisyui


🌼   daisyUI 4.12.10
├─ ✔︎ 1 theme added             https://daisyui.com/docs/themes
╰─ ★ Star daisyUI on GitHub     https://github.com/saadeghi/daisyui
```


# tmux commands
Create new session
> tmux

Detach session
> ctrl + b, d

Attach session
> ctrl + b, a

Switch session
> ctrl + b, s

Kill session
> x, y

# nano commands
Open file with sudo
> sudo nano /etc/hosts

Go to line number and character number
> ctrl + _ (ctrl + shift + _)

Save and Exit
> ctrl + s, ctrl + x

# nginx configuration
`/etc/nginx/sites-available/*****`

```
server {
        server_name *****.** www.*****.**;

        root /var/www/*****;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }

        location /system/ {
                alias /var/www/*****/system/;
                index index.html;
                try_files $uri $uri/ /system/index.html;
        }

        location /system/api/ {
                proxy_pass http://*************/api/;
                proxy_http_version 1.1;

                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/*****.**/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/*****.**/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.*****.**) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = *****.**) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80;
        listen [::]:80;

        server_name *****.** www.*****.**;
    return 404; # managed by Certbot
}
```
