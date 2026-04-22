//% color="#4b7bec" icon="\uf0c9" block="Double"
namespace double {
    let remoteValues: { [key: string]: number } = {};
    let onSyncHandler: (name: string, value: number) => void;

    /**
     * קביעת קבוצת הרדיו (ערוץ תקשורת).
     * שני המיקרוביטים חייבים להיות באותה קבוצה כדי לתקשר.
     * @param id מספר הקבוצה (0-255), eg: 1
     */
    //% block="connect to project on group %id"
    //% id.min=0 id.max=255
    export function connectToProject(id: number): void {
        radio.setGroup(id);
    }

    /**
     * מסנכרן משתנה עם המיקרוביט השני.
     * @param name שם המשתנה לסנכרון, eg: "points"
     * @param value הערך הנוכחי שלו
     */
    //% block="sync variable %name with value %value"
    export function syncVariable(name: string, value: number): void {
        radio.sendValue("sync_" + name, value);
    }

    /**
     * קבלת הערך האחרון שהתקבל עבור משתנה מסוים
     */
    //% block="remote variable %name"
    export function getRemoteVar(name: string): number {
        return remoteValues[name] || 0;
    }

    /**
     * אירוע שמופעל ברגע שמשתנה מסתנכרן מהצד השני
     */
    //% block="on variable %name synced"
    //% draggableParameters
    export function onVariableSynced(handler: (name: string, value: number) => void) {
        onSyncHandler = handler;
    }

    // ניהול קבלת נתונים ברדיו
    radio.onReceivedValue(function (name, value) {
        if (name.startsWith("sync_")) {
            let varName = name.substr(5);
            remoteValues[varName] = value;
            if (onSyncHandler) {
                onSyncHandler(varName, value);
            }
        }
    })
}

/**
* Gebruik dit bestand om specifieke functies en blokken te definiëren.
* Lees meer op https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
