from rest_framework import serializers
from .models import Component, Vehicle, Issue, Payment

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ("name","repair_price","purchase_price",)

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ("name",)


class IssueSerializer(serializers.ModelSerializer):
    component = serializers.PrimaryKeyRelatedField(queryset=Component.objects.all())
    vehicle= serializers.PrimaryKeyRelatedField(queryset=Vehicle.objects.all())
    class Meta:
        model = Issue
        fields =("vehicle","component","description","is_purchased")
       
        def to_representation(self, instance):      
            vehicle_data = VehicleSerializer(instance.vehicle).data if instance.vehicle else None
            component_data = ComponentSerializer(instance.component.all(), many=True).data
            return {
                'id': instance.id,
                'vehicle': vehicle_data,
                'description': instance.description,
                'is_purchased': component_data.is_purchased,
            }

class PaymentSerializer(serializers.ModelSerializer):
    vehicle = serializers.SlugRelatedField(
        queryset=Vehicle.objects.all(),  # Query all saved vehicles
        slug_field='name'  # Field used to represent the vehicle (can also use 'id' or any other unique field)
    )
    total_amount = serializers.SerializerMethodField()
    class Meta:
        model = Payment
        fields = ['id', 'vehicle', 'date', 'total_amount']

    

    def get_total_amount(self, instance):
        """
        Calculate the total amount of components for the selected vehicle.
        """
        # Get the vehicle instance
        vehicle = instance.vehicle

        # Call the method to calculate the total amount
        total_amount = Payment.get_total_amount_for_vehicle(vehicle.pk)
        return total_amount
