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

# guides

https://samhobbs.co.uk/2014/02/how-install-wordpress-raspberry-pi

https://fireship.io/lessons/host-website-raspberry-pi/

https://www.nano-editor.org/dist/latest/cheatsheet.html

https://github.com/ddclient/ddclient/blob/main/ddclient.conf.in

# ref

DNS Lookup occurs behind the scenes. 

https://www.cloudflare.com/learning/dns/what-is-dns/

In order to host a website on an IOT device, it needs a static External IP.
The IP needs to be registed with a DNS service so that it can be looked up externally.

![image](https://github.com/user-attachments/assets/595e05ef-6d58-46f3-8031-4514255d7c3a)

# prerequisites
1. nginx - install, to configure: add server block to nginx.conf (`sudo nano /etc/nginx/sites-enabled/default`)
2. add port forwarding to router config for ports 80, 443
3. ddclient - checks dyndns (http://checkip.dyndns.org/) to get current IP and updates to cloudflare server
using API Token (privileges: Zone.DNS.Edit, Zone.Zone.Read). Configured to run as service every 600s (`sudo nano /etc/ddclient.conf`)
4. certbot - install, new cert `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`, auto-renew `sudo certbot renew --dry-run`
5. cloudflare - DNS A Records (yourdomain.com, www.yourdomain.com) with external IP, set SSL/TLS to Full(strict)
6. ufw - linux uncomplicated firewall - ensure nginx is allowed `sudo ufw allow 'Nginx Full'`
7. timeshift - run and retain atleast 1 backup of server on separate disk/usb drive

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


