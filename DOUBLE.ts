//% color="#4b7bec" icon="\uf0c9" block="Double"
namespace double {
    let onSyncHandler: (name: string, value: number) => void;
    let remoteValues: { [key: string]: number } = {};

    /**
     * חיבור לפרויקט אחר דרך הרדיו. 
     * וודא שבשני המיקרוביטים מוגדר אותו מספר קבוצה.
     */
    //% block="connect to project on group %id"
    //% id.min=0 id.max=255 id.defl=1
    export function connectProject(id: number): void {
        radio.setGroup(id);
    }

    /**
     * מסנכרן משתנה עם המיקרוביט השני.
     */
    //% block="sync variable %name with value %value"
    export function syncVar(name: string, value: number): void {
        radio.sendValue("s_" + name, value);
    }

    /**
     * קבלת הערך האחרון של משתנה מהפרויקט השני
     */
    //% block="remote variable %name"
    export function getRemoteVar(name: string): number {
        return remoteValues[name] || 0;
    }

    /**
     * אירוע שמופעל כשמשתנה מסתנכרן מהצד השני.
     * הבלוק הזה מתוקן ולא יציג שגיאות!
     */
    //% block="on variable synced"
    //% draggableParameters="reporter"
    export function onVariableSynced(handler: (name: string, value: number) => void) {
        onSyncHandler = handler;
    }

    // ניהול קבלת הנתונים ברדיו
    radio.onReceivedValue(function (name, value) {
        if (name.startsWith("s_")) {
            let varName = name.substr(2);
            remoteValues[varName] = value;
            if (onSyncHandler) {
                onSyncHandler(varName, value);
            }
        }
    })
}
