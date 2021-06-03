import document from "document";
import {battery} from 'power';

export default class BatteryUtil {
    constructor(domHelper, settingsManager) {
        this.domHelper = domHelper;
        this.settingsManager = settingsManager;
    }

    updateBattery() {
        if (this.settingsManager.settings.showBattery) {          
            this.setBatteryLevel(this.getBatteryLevel());
        } else {
            this.hideBattery();
        }
    }
  
    getBatteryLevel() {
        if (battery.chargeLevel > 50) {
            const batteryMod = battery.chargeLevel % 10;
            const batteryMain = Math.ceil(battery.chargeLevel / 10);
            const batteryLevel = (batteryMod == 0) ? battery.chargeLevel : batteryMain * 10;
        } else {
            const batteryLevel = battery.chargeLevel;
        }
      
        return batteryLevel;
    }
  
    setBatteryLevel(level) {
        const batteryBarOffset = 35
        const batteryBarWidth = this.domHelper.root.width - (batteryBarOffset *2)
        this.domHelper.batteryBar.width = Math.ceil(batteryBarWidth * (1 - (level / 100)));
        this.domHelper.batteryBar.x = Math.ceil(batteryBarWidth * (level / 100) + batteryBarOffset);
    }
  
    hideBattery() {
        this.domHelper.batteryBar.x = this.domHelper.root.width;
        this.domHelper.batteryBar.width = this.domHelper.root.width;
    }
}