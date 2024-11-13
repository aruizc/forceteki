import AbilityHelper from '../../../AbilityHelper';
import { Card } from '../../../core/card/Card';
import { UpgradeCard } from '../../../core/card/UpgradeCard';
import { PlayType, Trait } from '../../../core/Constants';

export default class SnapshotReflexes extends UpgradeCard {
    protected override getImplementationId() {
        return {
            id: '9985638644',
            internalName: 'snapshot-reflexes'
        };
    }

    public override setupCardAbilities() {
        this.setAttachCondition((card: Card) => !card.hasSomeTrait(Trait.Vehicle));

        this.addWhenPlayedAbility({
            title: 'You may attack with attached unit.',
            optional: true,
            immediateEffect: AbilityHelper.immediateEffects.attack((context) => ({
                attacker: context.source.parentCard,
            }))
        });
    }
}

SnapshotReflexes.implemented = true;
