# NTTData-Webapp

### Remove all container from docker

```
sudo docker rm -f (sudo docker ps -aq)
```

### Run project

```
sudo docker compose up
```

### Add permission create folder and files (Linux)

```
sudo chmod -R 777 webapp2
```

---

### WordPress

<b>OBS:</b> Install plugins manually in the WordPress control panel, under the "Plugins" tab. By default, WordPress displays the plugins that need to be installed. However, this method is not functional when there is a plugin that has been created manually.

URL: [http://localhost:3001](http://localhost:3001)<br>
Dashboard: [http://localhost:3001/wp-login.php](http://localhost:3001/wp-login.php)<br>
<b>Username:</b> tawan.rio@webfoco.com<br>
<b>Password:</b> 123

---

### PHPMyAdmin

URL: [http://localhost:8080](http://localhost:8080)<br>
<b>Username:</b> root<br>
<b>Password:</b>

---

### APP

URL: [http://localhost:3001/app](http://localhost:3001/app)<br>
<b>Username:</b> hallan.costa1@hotmail.com<br>
<b>Password:</b> hallan123
