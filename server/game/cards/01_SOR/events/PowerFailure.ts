import AbilityHelper from '../../../AbilityHelper';
import { EventCard } from '../../../core/card/EventCard';
import { WildcardCardType } from '../../../core/Constants';

export default class PowerFailure extends EventCard {
    protected override getImplementationId() {
        return {
            id: '4323691274',
            internalName: 'power-failure',
        };
    }

    public override setupCardAbilities() {
        this.setEventAbility({
            title: 'Defeat any number of upgrades on a unit',
            targetResolver: {
                cardTypeFilter: WildcardCardType.Unit,
                immediateEffect: AbilityHelper.immediateEffects.defeat((context) => {
                    const allUpgrades = context.target.upgrades;
                    return { target: allUpgrades };
                })
            }
        });
    }
}

PowerFailure.implemented = true;