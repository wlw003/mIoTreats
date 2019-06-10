from wsgiref.simple_server import make_server # the wsgiref webserver (default with Python)
from pyramid.config import Configurator

from pyramid.response import Response
from pyramid.response import FileResponse
from pyramid.renderers import render_to_response

import paho.mqtt.publish as publish
import json

''' Routes '''

def template_route(req):
  return FileResponse('landing.html')

def analytics_route(req):
  return FileResponse('analytics.html')

def sign_route(req):
  return FileResponse('login.html')

def prof_route(req):
  return FileResponse('profile.html')

def feed_route(req):
  MQTT_SERVER = "iot.eclipse.org"
  MQTT_PATH = "yessir"
  publish.single(MQTT_PATH, "LED --> ON", hostname=MQTT_SERVER)
  print("done")
  return FileResponse('feed.html')

def test_route(req):
  test()
  
''' Main Application '''
def make_app() :
  with Configurator() as config:

    config.add_route('template_example', '/')
    config.add_view(template_route, route_name='template_example')

    config.add_route('analytics', '/analytics')
    config.add_view(analytics_route, route_name='analytics')

    config.add_route('sign', '/sign-in')
    config.add_view(sign_route, route_name='sign')

    config.add_route('myprofile', '/MichaelS')
    config.add_view(prof_route, route_name='myprofile')

    config.add_route('feed', '/feed')
    config.add_view(feed_route, route_name='feed')

    config.add_route('test', '/test')
    config.add_view(test_route, route_name='test')

    # add static folder to search path
    config.add_static_view(name='/', path='.', cache_max_age=3600)

    # create the webserver config
    app = config.make_wsgi_app()
  return app
  
def main():
  app = make_app()

  # run the server
  server = make_server('127.0.0.1', 8080, app)
  print("The server is now running on: http://127.0.0.1:8080")
  
  try:
    server.serve_forever()
  except KeyboardInterrupt:
    print("\nExiting...")
    exit(0)

if __name__ == '__main__':
  main()
else: application = make_app()



  

  


