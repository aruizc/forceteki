describe('Rey, Keeping the Past', function() {
    integration(function(contextRef) {
        describe('Rey\'s Ability', function() {
            it('ignores Heroism aspect penalty when unit Kylo is controlled', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['rey#keeping-the-past'],
                        groundArena: ['kylo-ren#killing-the-past', 'pyke-sentinel'],
                        base: 'dagobah-swamp',
                        leader: 'darth-vader#dark-lord-of-the-sith'
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.rey);

                // Rey should cost 5 since it ignores the villainy aspect
                expect(context.player1.countExhaustedResources()).toBe(5);
            });

            it('heals 2 and gives Shield token to a non-heroism unit', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['rey#keeping-the-past', 'pyke-sentinel']
                    }
                });

                const { context } = contextRef;

                context.setDamage(context.pykeSentinel, 2);
                context.player1.clickCard(context.rey);
                expect(context.player1).toBeAbleToSelectExactly([context.rey, context.pykeSentinel]);
                context.player1.clickCard(context.pykeSentinel);
                expect(context.pykeSentinel.damage).toBe(0);
                expect(context.pykeSentinel).toHaveExactUpgradeNames(['shield']);
            });

            it('heals 2 and gives Shield token to an enemy non-heroism non-villany unit', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: [{ card: 'rey#keeping-the-past' }]
                    },
                    player2: {
                        groundArena: [{ card: 'wild-rancor', damage: 2 }]
                    }
                });

                const { context } = contextRef;
                context.player1.clickCard(context.rey);
                context.player1.clickCard(context.wildRancor);
                expect(context.player1).toBeAbleToSelectExactly([context.rey, context.wildRancor]);
                context.player1.clickCard(context.wildRancor);
                expect(context.wildRancor.damage).toBe(0);
                // TODO: Uncomment this line and validate the test
                // expect(context.wildRancor).toHaveExactUpgradeNames(['shield']);
            });

            it('only heals 2 to a heroism unit', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['rey#keeping-the-past', 'battlefield-marine'],
                    }
                });

                const { context } = contextRef;

                context.setDamage(context.battlefieldMarine, 2);
                context.player1.clickCard(context.rey);
                expect(context.player1).toBeAbleToSelectExactly([context.rey, context.battlefieldMarine]);
                context.player1.clickCard(context.battlefieldMarine);
                expect(context.battlefieldMarine.getHp()).toBe(3);
                expect(context.battlefieldMarine).toHaveExactUpgradeNames([]); // no shield
            });

            // TODO: Uncomment this test after Kylo Ren leader is implemented
            // it('ignores Heroism aspect penalty when Kylo Ren is the leader', function () {
            //     contextRef.setupTest({
            //         phase: 'action',
            //         player1: {
            //             hand: ['rey#keeping-the-past'],
            //             base: 'kestro-city',
            //             leader: 'kylo-ren#rash-and-deadly'
            //         }
            //     });

            //     const { context } = contextRef;
            //     context.player1.clickCard(context.rey);
            //     // Rey should cost 5 since it ignores the heroism aspect due to Kylo Ren being the leader
            //     expect(context.player1.countExhaustedResources()).toBe(5);
            // });
        });
    });
});
