import { Injectable } from '@nestjs/common';

// TODO: Ugly as f*ck..? Necessary as NestJS does not validate types for us in requests, so we manually have to do it.
// Now we suddenly need to check stuff that essentially easily could be handled by the controller, when the request is recieved
const cakeKinds = ["chokolate", "brownie", "strawberry", "kaj"] as const
export type CakeKind = (typeof cakeKinds)[number] 
const isValidCakeKind = (x: any): x is CakeKind => cakeKinds.includes(x);

export class Cake {
    constructor(public id: number, public kind: CakeKind) {}
}

let lastUsedId = 2
let cakes = [
    new Cake(1, "brownie"),
    new Cake(lastUsedId, "chokolate")
]

@Injectable()
export class CakeService {
  getCakes(): Cake[] {
    return cakes;
  }

  getCakeById(id: number): Cake | undefined {
    return cakes.find(c => c.id === id)
  }

  addCake({ kind }: Cake) {
    const newCake = new Cake(++lastUsedId, kind)
    cakes.push(newCake)
  }

  updateCake(cake: Cake):  Cake | undefined {
    let result: Cake | undefined

    const dbCakeIndex = cakes.findIndex(c => c.id === cake.id)
    if(dbCakeIndex !== -1 && isValidCakeKind(cake.kind)) {
        cakes[dbCakeIndex] = cake
        result = cakes[dbCakeIndex]
    } else {
        result = undefined
    }

    return result
  }

  removeCake(id: number) {
    cakes = cakes.filter(c => c.id !== id)
  }
}
