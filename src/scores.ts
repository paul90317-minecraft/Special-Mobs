import { Objective, objective } from 'mcfn.ts'

export const score = {
    rage_value: objective(),
    mob_ticker: objective().get('#world'),
    spawn_ticker: objective().get('#world'),
    hurttime: objective(),
    state: objective(),
    temp: Array(10).fill(0).map(()=>objective())
}
