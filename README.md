# ts-list-zipper


A zipper for use with arrays in TS.

```javascript

import { Zipper } from "Zipper"

let zipper = Zipper.fromCons(1, [2, 3]);

console.log(zipper.current()); // 1

zipper.next();
console.log(zipper.current()); // 2

zipper.next();
console.log(zipper.current()); // 3

zipper.next();
console.log(zipper.current()); // 3

zipper.first();
console.log(zipper.current()); // 1

```