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

            it('attached unit attacks when played', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.snapshotReflexes);
                context.player1.clickCard(context.battlefieldMarine);

                expect(context.player1).toBeAbleToSelectExactly(context.specforceSoldier);

                context.player1.clickCard(context.specforceSoldier);

                expect(context.player2).toBeActivePlayer();
                expect(context.battlefieldMarine).toHaveExactUpgradeNames(['snapshot-reflexes']);
                expect(context.battlefieldMarine.exhausted).toBeTrue();
            });
        });
    });
});
