// Code goes here!
/// <reference path="ProjectList.ts" />
/// <reference path="ProjectInput.ts" />
/// <reference path="Decorators.ts" />
/// <reference path="ProjectState.ts" />
/// <reference path="Interfaces.ts" />
/// <reference path="Utils.ts" />

namespace App {
    const prjInput = new ProjectInput();
    const activePrjList = new ProjectList('active')
    const finishedPrjList = new ProjectList('finished')
    console.log([prjInput, activePrjList, finishedPrjList].length)
}
