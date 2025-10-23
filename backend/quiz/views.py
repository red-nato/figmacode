from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import GameSession, PhaseResult
from .serializers import GameSessionSerializer, PhaseResultSerializer, TokenConfigSerializer


class GameSessionViewSet(viewsets.ModelViewSet):
	queryset = GameSession.objects.all().order_by('-created_at')
	serializer_class = GameSessionSerializer

	@action(detail=True, methods=['post'])
	def complete_phase(self, request, pk=None):
		try:
			session = self.get_object()
		except GameSession.DoesNotExist:
			return Response({"detail": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

		phase_number = int(request.data.get('phaseNumber', 0))
		tokens_earned = int(request.data.get('tokensEarned', 0))
		if phase_number <= 0:
			return Response({"detail": "Invalid phaseNumber"}, status=status.HTTP_400_BAD_REQUEST)

		phase_result, created = PhaseResult.objects.get_or_create(
			session=session, phase_number=phase_number,
			defaults={"tokens_earned": tokens_earned},
		)
		if not created:
			phase_result.tokens_earned = tokens_earned
			phase_result.save(update_fields=["tokens_earned"])

		session.tokens_total = sum(r.tokens_earned for r in session.phase_results.all())
		session.current_phase = max(session.current_phase, phase_number + 1)
		session.save(update_fields=["tokens_total", "current_phase"])

		return Response({
			"sessionId": session.id,
			"tokensTotal": session.tokens_total,
			"currentPhase": session.current_phase,
		})

	@action(detail=True, methods=['post'])
	def complete_game(self, request, pk=None):
		session = self.get_object()
		session.is_completed = True
		session.save(update_fields=["is_completed"])
		return Response({"sessionId": session.id, "completed": True})


class TokenConfigViewSet(viewsets.ViewSet):
	def list(self, request):
		# Static token configs; could be made dynamic later
		return Response(TokenConfigSerializer.get_default_config())
