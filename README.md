![Master Build Status](https://img.shields.io/travis/velescore/masternode-dashboard/master?style=for-the-badge) ![Latest 
Release](https://img.shields.io/static/v1?label=Release&message=unreleased&color=blue&style=for-the-badge) 
![Licence](https://img.shields.io/github/license/velescore/masternode-dashboard?color=blue&style=for-the-badge)

# Veles Masternode Dashboard
This dashboard web-application is part of the Veles Core Masternode and provides web-based UI for monitoring
and administration of the masternode.

## Demo preview
You can try the Masternode Dashboard web UI visiting [this link](https://velescore.github.io/masternode-dashboard/public/index.html)
hosted on github.io.

### Method 2
For local testing and development you can clone this repository to your webroot and compile the page
by running following command from within the projects's directory:
```make```
or alternatively
```./manage.py rebuild index```

Now you can point your browser to file `public/index.html` (URL depends on the settings of your webserver) 
to access the dashboard connected to the random gen2 masternode through dAPI gateway. 

*Note: To apply any changes in Jinja templates it is neccessary to rebuild index page.*

## Requirements
- Webserver - Apache, Lighttpd, Nginx, etc. (setting up a webserver is a issue outside of the scope of this
file.)
- Python 3.6+ (`apt-get install python3 pip3`)
- Jinja2 - (`pip install -r requirements.txt` or `pip3 install -r requirements.txt`)
