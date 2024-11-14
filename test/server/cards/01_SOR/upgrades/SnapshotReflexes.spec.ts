describe('Snapshot Reflexes', function() {
    integration(function(contextRef) {
        describe('Snapshot Reflexes\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['battlefield-marine'],
                        hand: ['snapshot-reflexes']
                    },
                    player2: {
                        groundArena: ['specforce-soldier']
                    }
                });
            });

            it('attached unit may attack when played', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.snapshotReflexes);
                context.player1.clickCard(context.battlefieldMarine);

                context.player1.clickPrompt('You may attack with attached unit.');
                context.player1.clickCard(context.specforceSoldier);

                expect(context.battlefieldMarine).toHaveExactUpgradeNames(['snapshot-reflexes']);
                expect(context.battlefieldMarine.exhausted).toBe(true);
                expect(context.player2).toBeActivePlayer();
            });

            it('attached unit may attack when played, selects not to attack', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.snapshotReflexes);
                context.player1.clickCard(context.battlefieldMarine);

                context.player1.passAction();

                expect(context.battlefieldMarine).toHaveExactUpgradeNames(['snapshot-reflexes']);
                expect(context.battlefieldMarine.exhausted).toBe(false);
                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
