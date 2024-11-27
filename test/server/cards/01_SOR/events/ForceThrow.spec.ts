describe('Force Throw', function() {
    integration(function(contextRef) {
        describe('Force Throw\'s ability', function() {
            it('should select opponent to discard a card and deal damage to a unit equals to its cost', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['force-throw'],
                        groundArena: ['wampa', 'ezra-bridger#resourceful-troublemaker']
                    },
                    player2: {
                        hand: ['karabast'],
                        groundArena: ['specforce-soldier', 'atst'],
                        spaceArena: ['tieln-fighter']
                    }
                });

                const { context } = contextRef;

                // Damage dealt by opponent discarded card
                context.player1.clickCard(context.forceThrow);
                context.player1.clickPrompt('Opponent');
                expect(context.karabast).toBeInZone('discard');
                expect(context.player1).toBeAbleToSelectExactly([context.tielnFighter, context.specforceSoldier, context.atst, context.wampa, context.ezraBridger]);
                context.player1.clickCard(context.atst);
                expect(context.atst.damage).toBe(2);
                expect(context.player2).toBeActivePlayer();
            });

            it('should select opponent to discard a card but no deal damage as there is not a force unit', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['force-throw'],
                        groundArena: ['wampa']
                    },
                    player2: {
                        hand: ['karabast'],
                        groundArena: ['specforce-soldier', 'atst']
                    }
                });

                const { context } = contextRef;

                // Opponent discards a card no force unit in play
                context.player1.clickCard(context.forceThrow);
                context.player1.clickPrompt('Opponent');

                expect(context.karabast).toBeInZone('discard');
                expect(context.player2).toBeActivePlayer();
            });

            it('should select myself to discard a card but no deal damage as there is not a force unit', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['force-throw', 'karabast'],
                        groundArena: ['wampa']
                    },
                    player2: {
                        groundArena: ['specforce-soldier', 'atst']
                    }
                });

                const { context } = contextRef;

                // Discard a card and no force unit in play
                context.player1.clickCard(context.forceThrow);
                context.player1.clickPrompt('You');

                expect(context.karabast).toBeInZone('discard');
                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
