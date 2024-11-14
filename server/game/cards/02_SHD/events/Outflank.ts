import { EventCard } from '../../../core/card/EventCard';
import { RelativePlayer, WildcardCardType, WildcardLocation } from '../../../core/Constants';
import AbilityHelper from '../../../AbilityHelper';

export default class Outflank extends EventCard {
    protected override getImplementationId () {
        return {
            id: '0802973415',
            internalName: 'outflank',
        };
    }

    public override setupCardAbilities () {
        this.setEventAbility({
            title: 'Attack with two units (one at a time)',
            initiateAttack: {

            },
            then: (thenContext) => ({
                title: 'Attack with another unit',
                initiateAttack: {
                    attackerCondition: (card) => thenContext.target !== card
                }
            })
        });
    }
}

Outflank.implemented = true;
