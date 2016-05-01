from django.shortcuts import render, redirect, get_object_or_404
from django.core.urlresolvers import reverse
from django.db import transaction
from django.http import HttpResponse, Http404
from django.core import serializers
from polls.models import *



# Create your views here.
def home(request):
    context={};
    return render(request, 'king.html', context)
