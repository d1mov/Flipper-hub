/* Flipper Zero JavaScript BadUSB */
let badusb = require('badusb');
let notify = require('notification');
let flipper = require('flipper');
let dialog = require('dialog');

badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: 'Flipper', prod_name: 'Zero' });

dialog.message('BADUSB', 'Press OK to start');

if (badusb.isConnected()) {
    notify.blink('green', 'short');
    console.log('USB is connected');
    badusb.press("GUI", "r");
	delay(1000);
	badusb.println("notepad.exe");
	badusb.press('ENTER');
	delay(1000);
	badusb.println("Greetings!");
	badusb.press('ENTER');
	badusb.println("You've just launched GoodUSB!");
	badusb.press('ENTER');
	badusb.press('ENTER');
	badusb.println("This script will take the following actions:");
	badusb.press('ENTER');
	badusb.println("1) Download ClamAV");
	badusb.press('ENTER');
	badusb.println("2) Update ClamAV to the latest malware definitions.");
	badusb.press('ENTER');
	badusb.println("3) Scan your system memory for any malicious processes.");
	badusb.press('ENTER');
	badusb.println("4) If any are found, TERMINATE THEM!");
	badusb.press('ENTER');
	badusb.press('ENTER');
	badusb.println("This process may take a very long time, about 30 minutes to an hour.");
	badusb.press('ENTER');
	badusb.println("You can abort now by unplugging this device.");
	badusb.press('ENTER');
	badusb.println("Otherwise, the process will begin in 5...");
	delay(3000);
	badusb.println("4...");
	delay(3000);
	badusb.println("3...");
	delay(3000);
	badusb.println("2...");
	delay(3000);
	badusb.println("1...");
	delay(3000);
	badusb.println("0");
	badusb.press('ENTER');
	badusb.println("Away we go!");
	delay(2000);
	badusb.press('ALT', 'F4');
	delay(1000);
	badusb.press('ALT', 'N');
	badusb.press('GUI', 'r');
	delay(1000);
	badusb.println("powershell.exe");
	badusb.press('ENTER');
	delay(1000);
	badusb.println("Start-Process powershell -Verb runAs ; exit");
	badusb.press('ENTER');
	delay(4000);
	badusb.press('ENTER');
	delay(4000);
	badusb.println("mkdir $env:USERPROFILE\\AppData\\Local\\Temp ; cd $env:USERPROFILE\\AppData\\Local\\Temp ; Invoke-WebRequest -Uri https://www.clamav.net/downloads/production/clamav-0.105.0.win.x64.zip -OutFile clam.zip ; Expand-Archive -Force clam.zip ; del clam.zip ; cd clam\\* ; mv .\\conf_examples\\freshclam.conf.sample freshclam.conf ; mv .\\conf_examples\\clamd.conf.sample clamd.conf ; Set-Content -Path \"freshclam.conf\" -Value (get-content -Path \"freshclam.conf\" | Select-String -Pattern 'Example' -NotMatch) ; Set-Content -Path \"clamd.conf\" -Value (get-content -Path \"clamd.conf\" | Select-String -Pattern 'Example' -NotMatch) ; Start-Process -Wait .\\freshclam.exe ; Start-Process -NoNewWindow -Wait .\\clamscan.exe \"--memory --kill\" ; cd $env:USERPROFILE\\AppData\\Local\\Temp ; rmdir -R clam");
	badusb.press('ENTER');


    notify.success();
} else {
    console.log('USB not connected');
    notify.error();
}

badusb.quit();
    