import { MCFunction, EntityTag, type ENTITY_TYPES, Item, tag, mcfn, item, Text, nbt, sel, execute, data, tp, coord, playsound, summon, damage, particle } from '@paul90317/mcfn.ts'
import type { DAMAGE_TYPES, LootTable, PARTICLE_TYPES } from '@paul90317/mcfn.ts'

export type MOB_TYPE = {
    tag: EntityTag
    name?: Text[] | Text
    behave?: {
        tick?: ()=>void
        hurt?: ()=>void
        load?: ()=>void
    }
    armor?: {
        head?: Item
        chest?: Item
        legs?: Item
        feet?: Item
    }
    weapon?:{
        mainhand?: Item
        offhand?: Item
    }
    loot?: LootTable
}