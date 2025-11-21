# Installing Swift
To install Swift, choose the instructions below that match your operating system. Swift is officially supported on macOS, Windows, and Linux.

### **1. macOS**

Swift is native to the Apple ecosystem and is bundled with **Xcode**, Apple's official Integrated Development Environment (IDE).

  * **Option A: Full Installation (Recommended for App Development)**

    1.  Open the **Mac App Store**.
    2.  Search for **Xcode** and click **Get/Install**.
    3.  Once installed, open Xcode to agree to the license terms and complete the component installation.

  * **Option B: Command Line Only (Lightweight)**
    If you only want to run Swift code from the terminal without the full Xcode IDE:

    1.  Open the **Terminal** app.
    2.  Run the following command:
        ```bash
        xcode-select --install
        ```
    3.  A pop-up will appear asking for confirmation. Click **Install**.

-----

### **2. Windows**

Installing Swift on Windows requires two parts: the core dependencies (Visual Studio) and the Swift toolchain itself.

  * **Step 1: Install Dependencies**
    Swift requires the Visual C++ build tools.

    1.  Download **Visual Studio Community** (free) from the [Microsoft website](https://visualstudio.microsoft.com/).
    2.  Run the installer. Under the "Workloads" tab, select **Desktop development with C++**.
    3.  On the right sidebar, ensure **Windows 10 (or 11) SDK** is checked.
    4.  Click **Install**.

  * **Step 2: Install Swift**
    **Using Winget (Command Line - Easiest):**

    1.  Open **Command Prompt** or **PowerShell** as Administrator.
    2.  Run the following command:
        ```bash
        winget install --id Swift.Toolchain -e
        ```

    **Manual Install:**

    1.  Go to the [Swift.org Download page](https://www.swift.org/download/).
    2.  Under the "Windows" section, download the **x86\_64** installer.
    3.  Run the `.exe` file and follow the prompts.

-----

### **3. Linux (Ubuntu/Debian)**

The easiest way to install Swift on Linux is using the official install script, or by downloading the binaries manually.

  * **Option A: Using the Swiftly CLI (Recommended)**

    1.  Open your terminal.
    2.  Install `curl` if you haven't already:
        ```bash
        sudo apt-get install curl
        ```
    3.  Run the official installer script:
        ```bash
        curl -L https://swift.org/install.sh | bash
        ```
    4.  Follow the on-screen prompts to complete the setup.

  * **Option B: Manual Installation**

    1.  Install required dependencies (for Ubuntu):
        ```bash
        sudo apt-get update
        sudo apt-get install clang libicu-dev
        ```
    2.  Download the latest specific release for your OS version from [Swift.org/download](https://www.swift.org/download/).
    3.  Extract the downloaded archive:
        ```bash
        tar xzf swift-<VERSION>-<OS>.tar.gz
        ```
    4.  Move the folder to a global location (optional but recommended):
        ```bash
        sudo mv swift-<VERSION>-<OS> /usr/share/swift
        ```
    5.  Add Swift to your path (add this line to your `~/.bashrc` or `~/.zshrc`):
        ```bash
        export PATH=/usr/share/swift/usr/bin:"$PATH"
        ```

-----

### **4. Verify Installation**

Regardless of your OS, verify that Swift is working by opening your terminal (or Command Prompt) and running:

```bash
swift --version
```

You should see output similar to: `Swift version 6.x.x (swift-6.x.x-RELEASE)`.
