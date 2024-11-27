describe('Power Failure', function() {
    integration(function(contextRef) {
        describe('Power Failure\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['power-failure'],
                        groundArena: [{ card: 'pyke-sentinel', upgrades: ['entrenched', 'devotion'] }],
                    },
                    player2: {
                        groundArena: ['wampa'],
                        spaceArena: [{ card: 'imperial-interceptor', upgrades: ['academy-training', 'shield'] }]
                    }
                });
            });

            it('defeats all upgrades on a unit', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.powerFailure);
                expect(context.player1).toBeAbleToSelectExactly([context.pykeSentinel, context.imperialInterceptor]);
                context.player1.clickCard(context.pykeSentinel);

                expect(context.pykeSentinel.isUpgraded()).toBe(false);
                expect(context.imperialInterceptor.isUpgraded()).toBe(true);
                expect(context.entrenched).toBeInZone('discard');
                expect(context.devotion).toBeInZone('discard');
            });

            it('defeats all upgrades on a enemy unit', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.powerFailure);
                expect(context.player1).toBeAbleToSelectExactly([context.pykeSentinel, context.imperialInterceptor]);
                context.player1.clickCard(context.imperialInterceptor);

                expect(context.imperialInterceptor.isUpgraded()).toBe(false);
                expect(context.pykeSentinel.isUpgraded()).toBe(true);
                expect(context.academyTraining).toBeInZone('discard');
            });
        });
    });
});
