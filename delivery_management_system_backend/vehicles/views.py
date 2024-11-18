from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import Component, Vehicle, Issue, Payment
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, PaymentSerializer
from rest_framework.decorators import api_view
from django.db.models import Sum
from datetime import datetime


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            valid_data = serializer.validated_data
            vehicle_name = valid_data['vehicle']           
            component_names =  valid_data['component']            
            is_purchased = True if data.get('is_purchased', False) else False
            description = data['description']

            try:
                vehicle_obj=Vehicle.objects.get(name=vehicle_name)               
                comp_obj=Component.objects.get(name=component_names)
            except Vehicle.DoesNotExist:
                return Response({"error": "Vehicle not found."}, status=status.HTTP_400_BAD_REQUEST)
            except Component.DoesNotExist:
                return Response({"error": "Component not found."}, status=status.HTTP_400_BAD_REQUEST)
            
            issue = Issue.objects.create(
            vehicle=vehicle_obj,
            description=description,
            is_purchased=is_purchased,
            component = comp_obj)

            return Response(request.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    lookup_field="vehicle_name"


    def list(self, request):
        """
        Handle GET /payments/ to list all payment objects.
        """
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    def retrieve(self, request, vehicle_name=None):
       
        vehicle = Vehicle.objects.get(name=vehicle_name)
        payment = Payment.objects.filter(vehicle=vehicle).first()
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
                    

@api_view(['GET'])
def revenue_report(request):
    today = datetime.today().date()

    # Get all payments for today
    daily_payments = Payment.objects.filter(date__date=today)
    # Get all payments for the current month
    monthly_payments = Payment.objects.filter(date__month=today.month, date__year=today.year)
    # Get all payments for the current year
    yearly_payments = Payment.objects.filter(date__year=today.year)

    # Calculate revenue using get_total_amount_for_vehicle for each payment
    def calculate_total_revenue(payments):
        total_revenue = 0
        for payment in payments:
            # Use the correct field name for the Vehicle primary key
            total_revenue += Payment.get_total_amount_for_vehicle(vehicle_id=payment.vehicle.pk)
        return total_revenue

    daily_revenue = calculate_total_revenue(daily_payments)
    monthly_revenue = calculate_total_revenue(monthly_payments)
    yearly_revenue = calculate_total_revenue(yearly_payments)

    return Response({
        "daily_revenue": daily_revenue,
        "monthly_revenue": monthly_revenue,
        "yearly_revenue": yearly_revenue,
    })

