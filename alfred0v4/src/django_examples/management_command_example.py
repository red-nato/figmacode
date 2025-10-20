# quiz_game/management/commands/setup_initial_data.py
# Comando de gestión para inicializar datos del juego

from django.core.management.base import BaseCommand
from quiz_game.models import TokenConfiguration, PhaseConfiguration


class Command(BaseCommand):
    help = 'Inicializa la configuración de tokens y fases del juego'

    def handle(self, *args, **options):
        self.stdout.write('Inicializando configuración del juego...')
        
        # Crear configuraciones de tokens para cada fase
        token_configs = [
            {
                'phase_number': 1,
                'min_tokens': 0,
                'max_tokens': 180,
                'config_data': {
                    'time_limit': 180,
                    'anagram_tokens': 30,
                    'word_search_tokens': 30,
                    'description': 'Fase de anagramas y sopas de letras con cronómetro de 3 minutos'
                }
            },
            {
                'phase_number': 2,
                'min_tokens': 0,
                'max_tokens': 150,
                'config_data': {
                    'challenge_tokens': 50,
                    'challenges': [
                        'tecnologia_adultos_mayores',
                        'fast_fashion_zonas_desechos',
                        'sustentabilidad_agua_agricultura'
                    ],
                    'description': 'Fase de historias de desafíos en emprendimiento'
                }
            },
            {
                'phase_number': 3,
                'min_tokens': 0,
                'max_tokens': 100,
                'config_data': {
                    'description': 'Fase 3'
                }
            },
            {
                'phase_number': 4,
                'min_tokens': 0,
                'max_tokens': 100,
                'config_data': {
                    'description': 'Fase 4'
                }
            },
            {
                'phase_number': 5,
                'min_tokens': 0,
                'max_tokens': 100,
                'config_data': {
                    'description': 'Fase 5'
                }
            },
        ]
        
        created_count = 0
        updated_count = 0
        
        for config in token_configs:
            obj, created = TokenConfiguration.objects.update_or_create(
                phase_number=config['phase_number'],
                defaults={
                    'min_tokens': config['min_tokens'],
                    'max_tokens': config['max_tokens'],
                    'config_data': config['config_data'],
                    'is_active': True
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Creada configuración para Fase {config["phase_number"]}')
                )
            else:
                updated_count += 1
                self.stdout.write(
                    self.style.WARNING(f'↻ Actualizada configuración para Fase {config["phase_number"]}')
                )
        
        # Crear configuraciones de fases
        phase_configs = [
            {
                'phase_number': 1,
                'name': 'Anagramas y Sopas de Letras',
                'description': 'Desafíos de anagramas y sopas de letras relacionados con emprendimiento',
                'time_limit': 180,
                'config_data': {
                    'type': 'timed_challenges'
                }
            },
            {
                'phase_number': 2,
                'name': 'Historias de Desafíos',
                'description': 'Historias contextuales sobre desafíos en emprendimiento',
                'time_limit': None,
                'config_data': {
                    'type': 'challenge_stories'
                }
            },
            {
                'phase_number': 3,
                'name': 'Fase 3',
                'description': 'Descripción de la fase 3',
                'time_limit': None,
                'config_data': {}
            },
            {
                'phase_number': 4,
                'name': 'Fase 4',
                'description': 'Descripción de la fase 4',
                'time_limit': None,
                'config_data': {}
            },
            {
                'phase_number': 5,
                'name': 'Fase 5',
                'description': 'Descripción de la fase 5',
                'time_limit': None,
                'config_data': {}
            },
        ]
        
        for config in phase_configs:
            obj, created = PhaseConfiguration.objects.update_or_create(
                phase_number=config['phase_number'],
                defaults={
                    'name': config['name'],
                    'description': config['description'],
                    'time_limit': config['time_limit'],
                    'is_enabled': True,
                    'config_data': config['config_data']
                }
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Creada configuración de fase: {config["name"]}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'↻ Actualizada configuración de fase: {config["name"]}')
                )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\n¡Completado! {created_count} configuraciones creadas, {updated_count} actualizadas.'
            )
        )
