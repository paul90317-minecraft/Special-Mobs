import { tag, item, nbt, sel, execute, data, vec3, playsound, summon, particle } from 'mcfn.ts'
import { score } from '../scores'
import { MOB_TYPE } from './type'
import { rush, bomb } from './utils'

export const robbery: MOB_TYPE = {
    tag: tag(),
    name: nbt.text({
        text: "Robbery",
        color: 'yellow',
        italic: false
    }),
    behave: {
        load: () => {
            data.entity(sel('@s')).at('CanPickUpLoot').set(nbt.byte(1))
        },
        tick: () => {
            const self = sel('@s')
            const rage = score.rage_value.get(self)
            execute.if(rage.ge(70)).run(()=>{
                rush(1.5, 0.8)
                particle('poof', vec3('~ ~ ~'), vec3('1 0.2 1'), 0, 20)
                playsound('entity.horse.jump', 'ambient', sel('@a'))
                rage.subby(70)
            })
            
            const player = sel('@p', {
                distance: {upper: 4},
                scores: [score.hurttime.between(7, 9)],
                limit: 1,
                sort: 'nearest'
            })
            
            execute.if(player).run(() => {
                const nbt_dropped = nbt.compound({
                    Item: nbt.compound({
                        count: nbt.int(1),
                        id: nbt.string('minecraft:sand')
                    })
                })
                summon('item', vec3('~ ~ ~'), nbt_dropped)
                const dropped = sel('@e', {
                    nbts: [nbt_dropped],
                    limit: 1,
                    type: 'item',
                    sort: 'nearest'
                })
                const main = item.slot(player, 'weapon.mainhand')
                item.slot(dropped, 'container.0').replace.from(main)
                main.replace.with(item('air'))
            })
            data.entity(sel('@s')).at('fall_distance').set(nbt.double(0))
        }
    },
    armor: {
        head: item('sandstone_slab'),
        chest: item('leather_chestplate', {
            incl: {
                dyed_color: nbt.int(2526768)
            }
        }),
        legs: item('leather_leggings', {
            incl: {
                dyed_color: nbt.int(12437933)
            }
        }),
        feet: item('leather_boots', {
            incl: {
                dyed_color: nbt.int(4544518)
            }
        })
    },
    weapon:{
        mainhand: item('wooden_sword'),
        offhand: item('bundle')
    }
}