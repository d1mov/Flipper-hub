let badusb = require("badusb");

badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: "WinActivator", prod_name: "MAS" });

delay(2000);

if (badusb.isConnected()) {
    print("Activator is connected");

    badusb.press("GUI", "r");
    delay(1000);
    badusb.println("notepad.exe");
    badusb.press('ENTER');
    delay(1000);
    badusb.println("Greetings!");
    badusb.press('ENTER');
    badusb.println("You've just launched Open-source MAS for Windows and Office activation!");
    badusb.press('ENTER');
    badusb.println("This script will download and execute the MAS activator");
    badusb.press('ENTER');
    badusb.press('ENTER');
    badusb.println("1) For Windows 10/11 use HWID Activation (Permanent/Requires Internet)");
    badusb.press('ENTER');
    badusb.println("2) For Windows Server use TSforge Activation (Permanent/Requires Internet)");
    badusb.press('ENTER');
    badusb.println("3) For Office use Ohook Activation (Permanent/No Internet Required)");
    badusb.press('ENTER');
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
    delay(1000);

    badusb.press("GUI", "r");
    delay(1500);
    badusb.println("powershell");
    badusb.press("ENTER");
    delay(1500);
    badusb.println("irm https://get.activated.win | iex; exit");
    badusb.press("ENTER");
    print("Continue on the Windows machine")
    delay(3000);

} else {
    print("MAS not connected");
}

// Stop HID cleanly
badusb.quit();
