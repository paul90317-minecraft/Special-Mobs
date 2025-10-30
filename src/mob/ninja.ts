import { MCFunction, EntityTag, type ENTITY_TYPES, Item, tag, mcfn, item, Text, nbt, sel, execute, data, tp, coord, playsound, summon, damage, particle, raw, effect } from '@paul90317/mcfn.ts'
import { MOB_TYPE } from './type'
import { rush, bomb } from './utils'

export const ninja: MOB_TYPE = {
    tag: tag(),
    name: nbt.text({
        text: "Ninja",
        color: 'white',
        italic: false
    }),
    behave: {
        hurt: () => {
            rush(-1.5, 1.2)
            particle('campfire_signal_smoke', coord('~ ~ ~'), coord('1 2 1'), 0.001, 500)
            playsound('entity.firework_rocket.blast', 'ambient', sel('@a'))
            effect.give(sel('@a', {
                distance: {upper: 3}
            }), 'blindness', 3)
            effect.give(sel('@a', {
                distance: {upper: 3}
            }), 'slowness', 3, 3)
        },
        tick: ()=>{
            data.entity(sel('@s')).at('fall_distance').set(nbt.double(0))
        }
    },
    armor: {
        head: item('stripped_oak_log'),
        chest: item('leather_chestplate', {'dyed_color': 1908001}),
        legs: item('chainmail_leggings'),
        feet: item('leather_boots', {'dyed_color': 1908001})
    },
    weapon:{
        mainhand: item('bow')
    }
}