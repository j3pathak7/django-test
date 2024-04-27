from django.urls import path
from . import views

urlpatterns = [
    path('capitalize/', views.CapitalizeTextView.as_view(), name='capitalize'),
]
