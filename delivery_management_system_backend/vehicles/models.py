from django.db import models
from decimal import Decimal
from django.db.models import Sum

class Component(models.Model):
    name = models.CharField(max_length=100,primary_key=True)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    purchase_price= models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self):
        return self.name

class Vehicle(models.Model):
    name = models.CharField(max_length=100,primary_key=True)

    def __str__(self):
        return f"{self.name}"

class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, related_name='issues', on_delete=models.CASCADE)
    component = models.ForeignKey(Component,on_delete=models.CASCADE,null=False)
    description = models.TextField(max_length=200)
    is_purchased = models.BooleanField(default=False)
            
    def __str__(self):
        return f"Issue for {self.vehicle.name}"


class Payment(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)   
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for {self.vehicle.name}"

    @staticmethod
    def get_total_amount_for_vehicle(vehicle_id, is_purchased=None, is_repair=None):
        """
        Calculate the total amount of components for a specific vehicle,
        filtered by is_purchased or is_repair flag.
        """
        # Get all issues related to the vehicle
        issues = Issue.objects.filter(vehicle_id=vehicle_id)
        total_amount = 0
        for issue in issues:
            # Filter components based on is_purchased or is_repair
            if is_purchased:
                total_amount += issue.component.purchase_price
            else:
                total_amount += issue.component.repair_price
            # Add the price of the component associated with the issue       
        return total_amount

