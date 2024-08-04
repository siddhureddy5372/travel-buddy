from rest_framework import serializers
from .models import User , UserPreference,Item,UserCountries

class ItemByNameField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            item = Item.objects.get(name=data)
        except Item.DoesNotExist:
            raise serializers.ValidationError(f"Item with name '{data}' does not exist.")
        return item

    def to_representation(self, value):
        return value.name

class User_info(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',"phone_number","facebook_token","apple_id" ,'username', 'dob', 'gender', 'location', 'bio', 'profile_pic']
    def create(self, validated_data):
        for key, value in validated_data.items():
            if value == '':
                validated_data[key] = None
        return super().create(validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',"phone_number","facebook_token","apple_id"]

class ProfileSavingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'dob', 'gender', 'location', 'bio', 'profile_pic',"notifications","show_gender","mode","has_created_profile"]


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'category', 'name']

class UserPreferenceSerializer(serializers.ModelSerializer):
    preference = ItemSerializer()

    class Meta:
        model = UserPreference
        fields = ['user', 'preference']

class MultipleUserPreferencesSerializer(serializers.Serializer):
    preferences = serializers.ListField(child=ItemByNameField(queryset=Item.objects.all()))

    def create(self, validated_data):
        user = self.context['user']
        preferences = validated_data['preferences']
        user_preferences = []

        for preference in preferences:
            user_preference, created = UserPreference.objects.get_or_create(
                user=user, preference=preference
            )
            user_preferences.append(user_preference)

        return user_preferences

class UserCountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCountries
        fields = ["user", "has_been", "want_to_go"]
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def to_internal_value(self, data):
        internal_value = super(UserCountriesSerializer, self).to_internal_value(data)
        internal_value['user'] = self.context['user']
        return internal_value

    def create(self, validated_data):
        validated_data['user'] = self.context['user']
        has_been = validated_data.get('has_been', [])
        want_to_go = validated_data.get('want_to_go', [])

        user_countries, created = UserCountries.objects.get_or_create(user=validated_data['user'])

        # Extend the existing has_been list
        user_countries.has_been = list(set(user_countries.has_been + has_been))
        user_countries.want_to_go = list(set(user_countries.want_to_go + want_to_go))
        
        user_countries.save()
        return user_countries

    def update(self, instance, validated_data):
        has_been = validated_data.get('has_been', [])
        want_to_go = validated_data.get('want_to_go', [])

        # Extend the existing has_been list
        instance.has_been = list(set(instance.has_been + has_been))
        instance.want_to_go = list(set(instance.want_to_go + want_to_go))
        
        instance.save()
        return instance
