from django.db import models


class GameSession(models.Model):
	team_name = models.CharField(max_length=128)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	current_phase = models.PositiveSmallIntegerField(default=1)
	tokens_total = models.IntegerField(default=0)
	is_completed = models.BooleanField(default=False)

	def __str__(self) -> str:
		return f"{self.team_name} (tokens={self.tokens_total})"


class PhaseResult(models.Model):
	session = models.ForeignKey(GameSession, on_delete=models.CASCADE, related_name='phase_results')
	phase_number = models.PositiveSmallIntegerField()
	tokens_earned = models.IntegerField(default=0)
	completed_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		unique_together = ('session', 'phase_number')

	def __str__(self) -> str:
		return f"Session {self.session_id} - Phase {self.phase_number}: {self.tokens_earned} tokens"
