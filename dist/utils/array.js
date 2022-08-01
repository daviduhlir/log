"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayUniqueExtended = exports.arrayUnique = void 0;
function arrayUnique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) {
                a.splice(j--, 1);
            }
        }
    }
    return a;
}
exports.arrayUnique = arrayUnique;
function arrayUniqueExtended(array) {
    return arrayUnique(array).map(item => {
        const times = array.filter(i => i === item).length;
        return {
            times,
            item,
        };
    });
}
exports.arrayUniqueExtended = arrayUniqueExtended;
//# sourceMappingURL=array.js.map