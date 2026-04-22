//% color="#4b7bec" icon="\uf0c9" block="Double"
namespace double {
    let onSyncHandler: (name: string, value: number) => void;
    let remoteValues: { [key: string]: number } = {};

    /**
     * חיבור לפרויקט אחר דרך הרדיו
     */
    //% block="connect to project on group %id"
    export function connectProject(id: number): void {
        radio.setGroup(id);
    }

    /**
     * מסנכרן משתנה
     */
    //% block="sync variable %name with value %value"
    export function syncVar(name: string, value: number): void {
        radio.sendValue("s_" + name, value);
    }

    /**
     * בלוק אירוע שמופעל כשיש נתון חדש
     */
    //% block="on variable received"
    //% draggableParameters="reporter"
    export function onVarReceived(handler: (name: string, value: number) => void) {
        onSyncHandler = handler;
    }

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
