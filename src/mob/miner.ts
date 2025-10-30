import { MCFunction, EntityTag, type ENTITY_TYPES, Item, tag, mcfn, item, Text, nbt, sel, execute, data, tp, coord, playsound, summon, damage, particle, effect } from '@paul90317/mcfn.ts'
import { score } from '../scores'
import { MOB_TYPE } from './type'
import { rush, bomb } from './utils'

export const miner: MOB_TYPE = {
    tag: tag(),
    name: nbt.text({
        text: "Miner",
        color: 'dark_gray',
        italic: false
    }),
    behave: {
        tick: () => {
            const player = sel('@p', {
                distance: {upper: 4},
                scores: [score.hurttime.between(7, 9)],
                limit: 1,
                sort: 'nearest'
            })
            
            execute.as(player).run(() => effect.give(player, 'mining_fatigue', 10, 3), true)
        }
    },
    armor: {
        head: item('turtle_helmet'),
        chest: item('leather_chestplate', {
            'dyed_color': 3290282
        }),
        legs: item('leather_leggings', {
            'dyed_color': 5926536
        }),
        feet: item('leather_boots', {
            'dyed_color': 11589170
        })
    },
    weapon:{
        mainhand: item('iron_pickaxe'),
        offhand: item('lantern')
    }
}