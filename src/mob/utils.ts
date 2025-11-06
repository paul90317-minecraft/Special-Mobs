import { MCFunction, EntityTag, type EntityTypeID, Item, tag, mcfn, item, TextObject, nbt, sel, execute, data, tp, vec3, playsound, summon, damage, particle, DamageTypeId, ParticleTypeID } from 'mcfn.ts'
import { score } from '../scores'
import { entity_types } from '../entity_types'

export function rush (portrait: number, vertical: number) {
    let self = sel('@s')
    let [x, y, z, dx, dy, dz] = score.temp.slice(0, 7).map(o=>o.get(self))
    let pos = data.entity(self).at('Pos')
    let motion = data.entity(self).at('Motion')
    const store = execute.store('result')
    store.score(x!).run(()=>pos.at(0).get(), true)
    store.score(y!).run(()=>pos.at(1).get(), true)
    store.score(z!).run(()=>pos.at(2).get(), true)
    tp(vec3(`^ ^${vertical} ^${portrait}`))
    store.score(dx!).run(()=>pos.at(0).get(), true)
    store.score(dy!).run(()=>pos.at(1).get(), true)
    store.score(dz!).run(()=>pos.at(2).get(), true)
    dx!.subby(x!)
    dy!.subby(y!)
    dz!.subby(z!)
    store.score(x!).run(()=>motion.at(0).get(), true)
    store.score(y!).run(()=>motion.at(1).get(), true)
    store.score(z!).run(()=>motion.at(2).get(), true)
    dx!.addby(x!)
    dy!.addby(y!)
    dz!.addby(z!)
    store.data(motion.at(0), 'double', 1).run(()=>dx!.get(), true)
    store.data(motion.at(1), 'double', 1).run(()=>dy!.get(), true)
    store.data(motion.at(2), 'double', 1).run(()=>dz!.get(), true)
}

export function bomb(damage_amount: number, radius: number, y: number, dy: number, damage_type: DamageTypeId, particle_type: ParticleTypeID, particle_speed: number, particle_amount: number) {
    let self = sel('@s')
    
    execute.positioned(vec3(`~${-radius} ~${y} ~${-radius}`)).as(sel('@e', {
        dx: 2 * radius, dy, dz: 2 * radius,
        type: entity_types.friend
    })).run(()=>damage(self, damage_amount, damage_type, self), true)

    particle(particle_type, vec3(`~ ~${y + dy / 2} ~`), vec3(`${radius} ${dy / 2} ${radius}`), particle_speed, particle_amount)
}
