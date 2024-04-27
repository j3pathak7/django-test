from django.urls import path
from . import views

urlpatterns = [
    path('capitalize/', views.CapitalizeTextView.as_view(), name='capitalize'),
    path('remove-bg/', views.RemoveBackgroundView.as_view(), name='remove-bg'),
]
