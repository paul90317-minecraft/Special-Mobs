import { tag, item, nbt, sel, data, vec3, playsound, particle, effect } from 'mcfn.ts'
import { MOB_TYPE } from './type'
import { rush } from './utils'

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
            particle('campfire_signal_smoke', vec3('~ ~ ~'), vec3('1 2 1'), 0.001, 500)
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
        chest: item('leather_chestplate', {
            incl: {dyed_color: nbt.int(1908001)}
        }),
        legs: item('chainmail_leggings'),
        feet: item('leather_boots', {
            incl: {dyed_color: nbt.int(1908001)}
        })
    },
    weapon:{
        mainhand: item('bow')
    }
}