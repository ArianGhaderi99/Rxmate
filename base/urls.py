from django.urls import path
from base import views
from .views import analyze_prescription
app_name="base"

urlpatterns = [
    path('', views.simple_view,name="home"),
    path("api/analyze/", analyze_prescription, name="analyze_prescription"),
]