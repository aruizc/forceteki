describe('Rey, Keeping the Past', function() {
    integration(function(contextRef) {
        describe('Rey\'s Ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['rey#keeping-the-past'],
                        groundArena: ['kylo-ren#killing-the-past', 'pyke-sentinel'],
                        base: 'dagobah-swamp',
                        leader: 'darth-vader#dark-lord-of-the-sith'
                    }
                });
            });

            it('ignores Heroism aspect penalty when unit Kylo is controlled', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.rey);

                // Rey should cost 5 since it ignores the villainy aspect
                expect(context.player1.countExhaustedResources()).toBe(5);
            });
        });

        // TO DO: Uncomment this test after Kylo Ren leader is implemented
        // describe('Rey\'s Ability', function() {
        //     beforeEach(function () {
        //         contextRef.setupTest({
        //             phase: 'action',
        //             player1: {
        //                 hand: ['rey#keeping-the-past'],
        //                 base: 'kestro-city',
        //                 leader: 'kylo-ren#rash-and-deadly'
        //             }
        //         });
        //     });

        //     it('ignores Heroism aspect penalty when Kylo Ren is the leader', function () {
        //         const { context } = contextRef;

        //         context.player1.clickCard(context.rey);

        //         // Rey should cost 5 since it ignores the heroism aspect
        //         expect(context.player1.countExhaustedResources()).toBe(5);
        //     });
        // });

        describe('Rey\'s Ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['rey#keeping-the-past', 'pyke-sentinel', 'battlefield-marine'],
                        base: 'kestro-city'
                    },
                    player2: {
                        spaceArena: ['concord-dawn-interceptors']
                    }
                });
            });

            it('heals 2 and gives Shield token to a non-heroism unit', function () {
                const { context } = contextRef;

                context.setDamage(context.pykeSentinel, 2);
                context.player1.clickCard(context.rey);
                expect(context.player1).toBeAbleToSelectExactly([context.rey, context.battlefieldMarine, context.pykeSentinel, context.concordDawnInterceptors]);
                context.player1.clickCard(context.pykeSentinel);
                expect(context.pykeSentinel.getHp()).toBe(3);
                expect(context.pykeSentinel).toHaveExactUpgradeNames(['shield']);
            });

            it('only heals 2 to a heroism unit', function () {
                const { context } = contextRef;

                context.setDamage(context.battlefieldMarine, 2);
                context.player1.clickCard(context.rey);
                expect(context.player1).toBeAbleToSelectExactly([context.rey, context.battlefieldMarine, context.pykeSentinel, context.concordDawnInterceptors]);
                context.player1.clickCard(context.battlefieldMarine);
                expect(context.battlefieldMarine.getHp()).toBe(3);
                expect(context.battlefieldMarine).toHaveExactUpgradeNames([]); // no shield
            });
        });
    });
});
