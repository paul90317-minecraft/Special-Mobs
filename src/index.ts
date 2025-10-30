import {sel, execute, mcfn, minecraft, tag, data, item, nbt, datapack, MCFunction, say, ret } from '@paul90317/mcfn.ts'
import { score } from './scores'
import { MOB_TYPE } from './mob/type'
import { mobs } from './mob'

function mob_hurt () {
    let self = sel('@s')
    let rage = score.rage_value.get(self)
    rage.addby(30)
    Object.values(mobs).forEach(mob=>{
        if(mob.behave?.hurt)
            execute.if(sel('@s', {
                tags: [mob.tag]
            })).run(mob.behave?.hurt)
    })
    
}

function mob_tick() {
    let self = sel('@s')
    let hurttime = score.hurttime.get(self)
    let rage = score.rage_value.get(self)
    execute.store('result').score(hurttime).run(()=>data.entity(self).at('HurtTime').get(), true)
    execute.if(hurttime.between(7, 9)).run(mob_hurt)
    Object.values(mobs).forEach(mob=>{
        if(mob.behave?.tick)
            execute.if(sel('@s', {
                tags: [mob.tag]
            })).run(mob.behave?.tick)
    })
    rage.addby(3)
}

function player_tick() {
    let self = sel('@s')
    let hurttime = score.hurttime.get(self)
    execute.store('result').score(hurttime).run(()=>data.entity(self).at('HurtTime').get(), true)
}

function mob_load (mob: MOB_TYPE) {
    let self = sel('@s')
    mob.tag.add(self)
    if(mob.armor?.head)
        item.slot(self, 'armor.head').replace.with(mob.armor?.head)
    if(mob.armor?.chest)
        item.slot(self, 'armor.chest').replace.with(mob.armor?.chest)
    if(mob.armor?.legs)
        item.slot(self, 'armor.legs').replace.with(mob.armor?.legs)
    if(mob.armor?.feet)
        item.slot(self, 'armor.feet').replace.with(mob.armor?.feet)
    
    if(mob.weapon?.mainhand)
        item.slot(self, 'weapon.mainhand').replace.with(mob.weapon?.mainhand)
    if(mob.weapon?.offhand)
        item.slot(self, 'weapon.offhand').replace.with(mob.weapon?.offhand)

    if(mob.name)
        data.entity(self).at('CustomName').set(mob.name)

    if(mob.loot)
        data.entity(self).at('DeathLootTable').set(nbt.string(mob.loot.toString()))

    mob.behave?.load?.()
}

const spm_tag = tag()

function try_spawn() {
    execute.as(sel('@e')).at(sel('@s')).if(sel('@p',{
        distance: {upper: 40}
    })).unless(sel('@p', {
        distance: {upper: 24}
    })).run(()=>{
        execute.unless(sel('@e', {
            tags: [spm_tag],
            distance: {upper: 16}
        })).run(()=>{
            let self = sel('@s')
            execute.if(sel('@s', {
                type: 'zombie'
            })).run(() => {
                execute.if(sel('@s', {
                    y:-600, dy: 648
                })).run(()=>ret(()=>{
                    spm_tag.add(self)
                    mob_load(mobs.miner)
                }), true)
                spm_tag.add(self)
                mob_load(mobs.barbarian)}
            )
            execute.if(sel('@s', {
                type: 'skeleton'
            })).run(() => {
                spm_tag.add(self)
                mob_load(mobs.ninja)}
            )
            execute.if(sel('@s', {
                type: 'husk'
            })).run(() => {
                spm_tag.add(self)
                mob_load(mobs.robbery)}
            )
        })
    })
}

minecraft.tick(()=>{
    execute.if(score.mob_ticker.ge(3)).run(()=>{
        execute.as(sel('@a')).at(sel('@s')).run(player_tick)

        execute.as(sel('@e', {
            tags: [spm_tag]
        })).at(sel('@s')).run(mob_tick)
        
        score.mob_ticker.assign(0)
    })
    score.mob_ticker.addby(1)

    execute.if(score.spawn_ticker.ge(200)).run(()=>{
        try_spawn()
        score.spawn_ticker.assign(0)
    })
    score.spawn_ticker.addby(1)
})
