import { tag, item, nbt, sel, execute, data, tp, vec3, playsound, particle } from 'mcfn.ts'
import { score } from '../scores'
import { MOB_TYPE } from './type'
import { rush, bomb } from './utils'

export const barbarian: MOB_TYPE = {
    tag: tag(),
    name: nbt.text({
        text: "Barbarian",
        color: 'green',
        italic: false
    }),
    behave: {
        tick: ()=>{
            let self = sel('@s')
            let rage = score.rage_value.get(self)
            let state = score.state.get(self)
            let onground = sel('@s',{
                nbts: [nbt.compound({
                    OnGround: nbt.byte(1)
                })]
            })
            execute.if(onground).if(state.eq(1)).run(()=>{
                bomb(8, 2, 0, 0, 'mob_attack', 'poof', 0, 400)
                playsound('entity.lightning_bolt.impact', 'ambient', sel('@a'))
                state.reset()
            })
            execute.if(rage.ge(70)).run(()=>{
                rush(1.5, 0.8)
                particle('poof', vec3('~ ~ ~'), vec3('1 0.2 1'), 0, 20)
                playsound('entity.horse.jump', 'ambient', sel('@a'))
                state.assign(1)
                rage.subby(70)
            })
            data.entity(sel('@s')).at('fall_distance').set(nbt.double(0))
        }
    },
    armor: {
        head: item('azalea'),
        chest: item('iron_chestplate'),
        feet: item('leather_boots')
    },
    weapon:{
        mainhand: item('iron_axe'),
        offhand: item('iron_sword')
    }
}