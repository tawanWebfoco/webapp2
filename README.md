# NTTData-Webapp

```
UPDATE wp_posts SET guid = REPLACE(guid,'http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/','http://localhost:3001/') WHERE guid LIKE '%http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/%';
UPDATE wp_posts SET post_content = REPLACE(post_content,'http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/','http://localhost:3001/') WHERE post_content LIKE '%http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/%';
UPDATE wp_options SET option_value = REPLACE(option_value,'http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/','http://localhost:3001/') WHERE option_value LIKE '%http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/%';
UPDATE wp_users SET user_url = REPLACE(user_url,'http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/','http://localhost:3001/') WHERE user_url LIKE '%http://localhost/htdocs/Webfoco/nttdata/webapp/NTTData-Webapp/%';
```
