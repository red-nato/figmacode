from rest_framework import serializers
from .models import GameSession, PhaseResult


class PhaseResultSerializer(serializers.ModelSerializer):
	class Meta:
		model = PhaseResult
		fields = ["id", "phase_number", "tokens_earned", "completed_at"]


class GameSessionSerializer(serializers.ModelSerializer):
	phase_results = PhaseResultSerializer(many=True, read_only=True)

	class Meta:
		model = GameSession
		fields = [
			"id",
			"team_name",
			"created_at",
			"updated_at",
			"current_phase",
			"tokens_total",
			"is_completed",
			"phase_results",
		]

	def create(self, validated_data):
		return GameSession.objects.create(**validated_data)


class TokenConfigSerializer:
	@staticmethod
	def get_default_config():
		# Mirrors frontend defaults; adjust as needed
		return {
			"phase1": {"completion": 15, "timeBonus": 10, "perfectAnagram": 5, "perfectWordSearch": 5},
			"phase2": {"completion": 20, "challengeSelection": 5},
			"phase3": {"correct": 25, "incorrect": 5},
			"phase4": {"correct": 30, "incorrect": 10},
			"phase5": {"correct": 35, "incorrect": 15},
		}


