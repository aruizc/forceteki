describe('Strike True', function() {
    integration(function(contextRef) {
        describe('Strike True\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['strike-true'],
                        groundArena: ['wampa', 'battlefield-marine']
                    },
                    player2: {
                        groundArena: ['specforce-soldier', 'atst'],
                        spaceArena: ['tieln-fighter']
                    }
                });
            });

            it('should deal damage to an enemy unit equals to a friendly unit power', function () {
                const { context } = contextRef;

                // Enemy unit is not defeated by the ability
                context.player1.clickCard(context.strikeTrue);
                expect(context.player1).toBeAbleToSelectExactly([context.wampa, context.battlefieldMarine]);
                context.player1.clickCard(context.wampa);
                expect(context.player1).toBeAbleToSelectExactly([context.tielnFighter, context.specforceSoldier, context.atst]);
                context.player1.clickCard(context.atst);
                expect(context.atst.damage).toBe(4);
            });
        });

        describe('Strike True\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['strike-true']
                    },
                    player2: {
                        hand: ['wampa', 'battlefield-marine']
                    }
                });
            });

            it('should be playable even if there is no friendly units ', function () {
                const { context } = contextRef;

                // Play the event if there is no friendly units
                context.player1.clickCard(context.strikeTrue);
                expect(context.player2).toBeActivePlayer();
            });
        });

        describe('Strike True\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['strike-true'],
                        groundArena: ['specforce-soldier', 'atst']
                    },
                    player2: {
                        hand: ['wampa']
                    }
                });
            });

            it('should be playable even if there is no enemy units ', function () {
                const { context } = contextRef;

                // Play the event if there is no enemy units
                context.player1.clickCard(context.strikeTrue);
                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
