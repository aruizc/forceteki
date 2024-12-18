describe('General Grievous, General Of The Droid Armies', function () {
    integration(function (contextRef) {
        describe('General Grievous\'s leader undeployed ability', function () {
            it('should Sentinel to a Droid unit for this phase', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['battle-droid-legion'],
                        spaceArena: ['devastating-gunship'],
                        leader: 'general-grievous#general-of-the-droid-armies'
                    },
                    player2: {
                        groundArena: ['battlefield-marine', 'atst'],
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.generalGrievous);
                context.player1.clickPrompt('Give a Droid unit Sentinel for this phase');
                expect(context.player1).toBeAbleToSelectExactly([context.devastatingGunship, context.battleDroidLegion]);
                context.player1.clickCard(context.battleDroidLegion);

                // Player 2 attacks Sentinel Droid
                expect(context.player2).toBeActivePlayer();
                expect(context.generalGrievous.exhausted).toBeTrue();
                context.player2.clickCard(context.battlefieldMarine);
                expect(context.player2).toBeAbleToSelectExactly([context.battleDroidLegion]);
                context.player2.clickCard(context.battleDroidLegion);

                // Next action phase
                context.moveToNextActionPhase();

                context.player1.passAction();
                context.player2.clickCard(context.atst);
                expect(context.player2).toBeAbleToSelectExactly([context.p1Base, context.battleDroidLegion]); // No longer Sentinel
                context.player2.clickCard(context.p1Base);
            });
        });

        describe('General Grievous\'s leader deployed ability', function () {
            it('should give a Droid unit +1/+0 and Sentinel for the phase', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        spaceArena: ['devastating-gunship'],
                        leader: { card: 'general-grievous#general-of-the-droid-armies', deployed: true }
                    },
                    player2: {
                        spaceArena: ['wing-leader', 'green-squadron-awing']
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.generalGrievous);
                context.player1.clickCard(context.p2Base);
                expect(context.player1).toHavePassAbilityPrompt('Give a Droid unit +1/+0 and Sentinel for this phase');
                context.player1.clickPrompt('Give a Droid unit +1/+0 and Sentinel for this phase');

                expect(context.devastatingGunship.getPower()).toBe(4); // Droid unit gains +1/+0
                expect(context.devastatingGunship.getHp()).toBe(5);

                // Unit gains Sentinel
                context.player2.clickCard(context.wingLeader);
                expect(context.player2).toBeAbleToSelectExactly([context.devastatingGunship]);
                context.player2.clickCard(context.devastatingGunship);

                // Next action phase
                context.moveToNextActionPhase();

                // Unit lost buffs and Sentinel
                context.player1.passAction();
                context.player2.clickCard(context.greenSquadronAwing);
                expect(context.player2).toBeAbleToSelectExactly([context.p1Base, context.devastatingGunship]);
                context.player2.clickCard(context.p1Base);

                expect(context.player1).toBeActivePlayer();
                expect(context.devastatingGunship.getPower()).toBe(5); // 2 Damage counters (Grit) and base power of 3
            });
        });
    });
});